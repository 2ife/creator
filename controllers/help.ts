import { RequestHandler } from "express";
import {  ReqError } from "./common";

const renderHelp: RequestHandler = async (req, res, next) => {
  let part = req.params.part;
  if (
    ![
      "tutorial",
      "creator",
      "summoner",
      "totem",
      "item",
      "craft",
      "market",
      "cashShop",
      "rateInfo",
      "rule",
      "inquiry",
    ].includes(part)
  ) {
    return res.redirect('/help/tutorial')
  }
  return res.render("help", { part });
};

export { renderHelp };
