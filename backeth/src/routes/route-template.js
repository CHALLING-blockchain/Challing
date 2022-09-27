import { Router } from "express";

const router = Router();

router.get("/ya", (req, res, next) => {
  res.json({ data: "nolja" });
});

router.get("/yaya/:foo", (req, res, next) => {
  console.log(req.params.foo);
  res.json(req.params);
});

export default router;
