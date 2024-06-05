import { LandingPage } from "./scenes/landing";
import { LoginPage } from "./scenes/login";
import { NotFoundPage } from "./scenes/not-found";
import { RegisterPage } from "./scenes/register";
import { TasksEditPage, TasksPage } from "./scenes/tasks";
import { UsersPage } from "./scenes/users";

export const routes = {
  public: [
    {
      path: "/",
      page: LandingPage,
    },
    {
      path: "/not-found",
      page: NotFoundPage,
    },
    {
      path: "/register",
      page: RegisterPage,
    },
    {
      path: "/login",
      page: LoginPage,
    },
  ],
  private: [
    {
      path: "/tasks",
      page: TasksPage,
    },
    {
      path: "/tasks/edit",
      page: TasksEditPage,
    },
    {
      path: "/users",
      page: UsersPage,
    },
  ],
};
