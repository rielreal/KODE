package main

import (
	"database/sql"
	"encoding/json"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func initDB() {
	var err error
	db, err = sql.Open("sqlite3", "./canteen.db")
	if err != nil {
		log.Fatal(err)
	}

	createTable := `
	CREATE TABLE IF NOT EXISTS menu (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		day TEXT NOT NULL,
		items TEXT NOT NULL,
		dessert TEXT
	);`

	_, err = db.Exec(createTable)
	if err != nil {
		log.Fatal(err)
	}
}

func saveMenu(menus []DayMenu) error {
	_, err := db.Exec("DELETE FROM menu")
	if err != nil {
		return err
	}

	for _, m := range menus {
		items, _ := json.Marshal(m.Items)
		var dessert []byte
		if m.Dessert != nil {
			dessert, _ = json.Marshal(m.Dessert)
		}

		_, err := db.Exec("INSERT INTO menu (day, items, dessert) VALUES (?, ?, ?)",
			m.Day, string(items), string(dessert))
		if err != nil {
			return err
		}
	}
	return nil
}

func getMenu() ([]DayMenu, error) {
	rows, err := db.Query("SELECT day, items, dessert FROM menu ORDER BY id")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var menus []DayMenu
	for rows.Next() {
		var day, items string
		var dessert sql.NullString

		err := rows.Scan(&day, &items, &dessert)
		if err != nil {
			return nil, err
		}

		var itemList []MenuItem
		json.Unmarshal([]byte(items), &itemList)

		m := DayMenu{Day: day, Items: itemList}

		if dessert.Valid && dessert.String != "" {
			var d MenuItem
			json.Unmarshal([]byte(dessert.String), &d)
			m.Dessert = &d
		}

		menus = append(menus, m)
	}
	return menus, nil
}
