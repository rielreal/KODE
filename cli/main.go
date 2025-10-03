package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"os"
)

type MenuItem struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Category    string  `json:"category"`
	Available   bool    `json:"available"`
}

func main() {
	addCmd := flag.NewFlagSet("add", flag.ExitOnError)
	name := addCmd.String("name", "", "Item name")
	description := addCmd.String("description", "", "Item description")
	price := addCmd.Float64("price", 0, "Item price")
	category := addCmd.String("category", "", "Item category")
	available := addCmd.Bool("available", true, "Item availability")

	if len(os.Args) < 2 {
		fmt.Println("Usage: cli add -name='...' -price=... -description='...' -category='...'")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "add":
		addCmd.Parse(os.Args[2:])
		if *name == "" || *price == 0 {
			fmt.Println("name and price are required")
			os.Exit(1)
		}

		item := MenuItem{
			Name:        *name,
			Description: *description,
			Price:       *price,
			Category:    *category,
			Available:   *available,
		}

		jsonData, _ := json.Marshal(item)
		resp, err := http.Post("http://localhost:8080/api/menu", "application/json", bytes.NewBuffer(jsonData))
		if err != nil {
			fmt.Println("Error:", err)
			os.Exit(1)
		}
		defer resp.Body.Close()

		if resp.StatusCode == http.StatusCreated {
			fmt.Println("Menu item added successfully!")
		} else {
			fmt.Println("Failed to add menu item")
		}
	default:
		fmt.Println("Unknown command")
		os.Exit(1)
	}
}
