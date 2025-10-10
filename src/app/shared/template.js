import fs from "fs";
import Mustache from "mustache";

export function GetTemplate(templateName, data) {
  const template = fs.readFileSync(`./src/template/${templateName}.html`, "utf8");
  const html = Mustache.render(template, data);
  return html;
}