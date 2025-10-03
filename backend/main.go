package main

import (
	"log"
	"net/http"
	"time"
)

func checkAndResetMenu() {
	for {
		now := time.Now()

		// Check if it's Sunday (0)
		if now.Weekday() == time.Sunday {
			// Delete all menu items
			_, err := db.Exec("DELETE FROM menu")
			if err != nil {
				log.Println("Error resetting menu:", err)
			} else {
				log.Println("Menu reset on Sunday")
			}

			// Sleep until Monday to avoid multiple resets
			time.Sleep(24 * time.Hour)
		}

		// Check every hour
		time.Sleep(1 * time.Hour)
	}
}

func main() {
	initDB()
	defer db.Close()

	// Start auto-reset in background
	go checkAndResetMenu()

	http.HandleFunc("/api/menu", handleGetMenu)
	http.HandleFunc("/api/admin/menu", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			handleAdminGetMenu(w, r)
		} else if r.Method == "POST" {
			handleAdminSaveMenu(w, r)
		}
	})

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
