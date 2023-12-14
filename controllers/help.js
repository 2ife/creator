"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHelp = void 0;
const renderHelp = async (req, res, next) => {
    let part = req.params.part;
    if (![
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
    ].includes(part)) {
        return res.redirect('/help/tutorial');
    }
    return res.render("help", { part });
};
exports.renderHelp = renderHelp;
