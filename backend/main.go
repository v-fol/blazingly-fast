package main

import (
	"log"
	"net/http"
	"os"
	"strings"
)


func check(e error) {
    if e != nil {
        panic(e)
    }
}
// Define a home handler function which writes a byte slice containing
// "Hello from Snippetbox" as the response body.
func home(writer http.ResponseWriter, request *http.Request) {

	if request.URL.Path != "/" {
		notFoudText := "Page " + request.URL.Path + " not found" 
		log.Print(notFoudText)
		http.NotFound(writer, request)
		return
	}

	log.Print("[200] : /")
	mainHtml, err := os.ReadFile("../frontend/dist/index.html")
	check(err)
	writer.Write([]byte(mainHtml))

}


func assets(writer http.ResponseWriter, request *http.Request){
	logNote := "[200] : " + request.URL.Path
	if request.URL.Path == "/assets/"{
		return
	}
	defer log.Print(logNote)
	path := request.URL.Path[strings.LastIndexByte(request.URL.Path, '.')+1:]
	switch path {
	case "js" : 
		writer.Header().Add("Content-Type", "application/javascript")
	case "css":
		writer.Header().Add("Content-Type", "text/css")
	case "svg":
		writer.Header().Add("Content-Type", "image/svg+xml")

	}
	// log.Print(path)
	file, err := os.ReadFile("../frontend/dist" + request.URL.Path)
	check(err)
	writer.Write([]byte(file))
}

func main() {
	// Use the http.NewServeMux() function to initialize a new servemux, then
	// register the home function as the handler for the "/" URL pattern.
	mux := http.NewServeMux()
	mux.HandleFunc("/", home)
	mux.HandleFunc("/assets/", assets)
	// Use the http.ListenAndServe() function to start a new web server. We pass in
	// two parameters: the TCP network address to listen on (in this case ":4000")
	// and the servemux we just created. If http.ListenAndServe() returns an error
	// we use the log.Fatal() function to log the error message and exit. Note
	// that any error returned by http.ListenAndServe() is always non-nil.
	log.Print("Starting server on :4000")
	err := http.ListenAndServe(":4000", mux)
	log.Fatal(err)
}
