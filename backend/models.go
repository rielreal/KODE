package main

type MenuItem struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type DayMenu struct {
	Day     string     `json:"day"`
	Items   []MenuItem `json:"items"`
	Dessert *MenuItem  `json:"dessert"`
}
