package main

import (
	"encoding/json"
	"net/http"
)

func setCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
}

func handleGetMenu(w http.ResponseWriter, r *http.Request) {
	setCORS(w)
	menus, err := getMenu()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(menus)
}

func handleAdminGetMenu(w http.ResponseWriter, r *http.Request) {
	setCORS(w)
	menus, err := getMenu()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(menus)
}

func handleAdminSaveMenu(w http.ResponseWriter, r *http.Request) {
	setCORS(w)
	var menus []DayMenu
	if err := json.NewDecoder(r.Body).Decode(&menus); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := saveMenu(menus); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
