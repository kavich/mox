// src/components/app/app.ts
class App {
  run() {
    return '<div id="app">I am APP</div>';
  }
  mount() {
    const appElement = document.getElementById("app");
    if (appElement) {
      appElement.innerHTML = this.run();
    }
  }
}

// src/web.ts
console.log("working");
var app = new App;
