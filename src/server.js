import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true })); //html에서  form을 사용하기 위해 추가

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    /* 만료 시간 지정
    cookie: {
      maxAge: 20000,
    },
    */
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

/* 모든 세션을 확인 할때 사용
app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    next();
  });
});
*/
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
