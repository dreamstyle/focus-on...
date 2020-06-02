import React from "react";
import List from "./components/List";
import sampleTodos from "./sample-todos";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AppFooter from "./components/AppFooter";

class App extends React.Component {
  state = {
    days: {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
    },
    themeOptions: ["light", "dark"],
    theme: "light",
  };

  loadSampleTodos = () => {
    this.setState({ days: sampleTodos });
  };

  addTodo = (day, todo) => {
    const days = { ...this.state.days };
    days[day].push(todo);
    this.setState({ days });
  };

  changeTitle = () => {
    const days = Object.keys(this.state.days);
    const now = new Date();
    const today = days[now.getDay() - 1];
    if (today > 5) return;
    this.state.days[today].some((task) => {
      if (task && !task.isFinish) {
        document.title = `Focus on... ${task.title}`;
        return true;
      } else {
        document.title = "Focus on...";
        return false;
      }
    });
  };

  editTodo = (day, i, todo) => {
    // 1. create a copy of days
    const days = { ...this.state.days };
    days[day][i] = todo;
    this.setState({ days });
  };

  deleteTodo = (day, i) => {
    // 1. create a copy of days
    const days = { ...this.state.days };
    days[day][i] = null;
    this.setState({ days });
  };

  reset = () => {
    this.setState({
      days: {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
      },
    });
  };

  setTheme = (event) => {
    let theme = { ...this.state.theme };
    theme = event.currentTarget.value;
    localStorage.setItem("theme", theme);
    this.setState({ theme });
    this.switchTheme(theme);
  };

  switchTheme = (theme) => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty("--bg-color", "#111");
      root.style.setProperty("--font-color", "#DDD");
    }
    if (theme === "light") {
      root.style.setProperty("--bg-color", "white");
      root.style.setProperty("--font-color", "black");
    }
  };

  renderThemeOptions = (theme) => {
    return (
      <button
        className="btn-nav btn-theme"
        onClick={this.setTheme}
        value={theme}
        key={theme}
      >
        {theme}
      </button>
    );
  };

  componentDidMount() {
    // 1. Load sample data if no todo in local storage
    if (!localStorage.getItem("days")) {
      this.setState({ days: sampleTodos });
    } else {
      const localStorageRef = localStorage.getItem("days");
      this.setState({ days: JSON.parse(localStorageRef) });
    }
    // 2. Load theme setting
    if (localStorage.getItem("theme")) {
      this.switchTheme(localStorage.getItem("theme"));
    }
  }

  componentDidUpdate() {
    localStorage.setItem("days", JSON.stringify(this.state.days));
    this.changeTitle();
  }

  render() {
    const days = Object.keys(this.state.days);
    const now = new Date();
    // const today = days[now.getDay() - 1];
    const today = 6;
    // const weekend = today > 5;

    return (
      <BrowserRouter>
        <div className="app-container">
          <nav className="nav">
            <div className="mode">
              <button>
                <Link to="/" className="btn-nav btn-mode">
                  Week
                </Link>
              </button>
              <span>/</span>
              <button>
                <Link to="/today" className="btn-nav btn-mode">
                  Today
                </Link>
              </button>
            </div>
            <div className="theme">
              {this.state.themeOptions.map(this.renderThemeOptions)}
            </div>
          </nav>
          <Switch>
            <Route path="/" exact>
              <section className="days">
                {days.map((key) => (
                  <List
                    key={key}
                    index={key}
                    mode="week"
                    day={this.state.days[key]}
                    editTodo={this.editTodo}
                    addTodo={this.addTodo}
                    deleteTodo={this.deleteTodo}
                  />
                ))}
              </section>
            </Route>

            {
              /* TODAY LIST ONLY SHOWN ON WEEKDAY */
              today > 6 ? (
                <Route path="/today">
                  <List
                    key={today}
                    index={today}
                    mode="today"
                    day={this.state.days[today]}
                    editTodo={this.editTodo}
                    addTodo={this.addTodo}
                    deleteTodo={this.deleteTodo}
                  />
                </Route>
              ) : (
                <h1 className="rest-quote">Learn to rest, not quit.</h1>
              )
            }
          </Switch>
          <AppFooter
            reset={this.reset}
            loadSampleTodos={this.loadSampleTodos}
          ></AppFooter>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
