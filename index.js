'use strict';

import axios from "axios";
import fs from "fs";

const getPage = async (page = 0) => {
  const size = 100;
  const { data } = await axios({
    method: "get",
    url: `http://sgo-ub20-rdm-p1.cepal.org/issues.json?project_id=redmine-pdi&limit=${size}&offset=${
      page * size
    }`,
    auth: {
      username: "redmine_pdi",
      password: "iiF!p5Z15!lc",
    },
    responseType: "json",
  }).catch((e) => console.log("error:", e));
  return data.issues;
};

const getData = async () => {
  const dataFetch = [...Array(4).keys()].map((_, page) => getPage(page + 0));
  const data = await Promise.all(dataFetch);
  return data.flat();
};

let loading = true
getData().then((data) => {
  fs.writeFileSync("issues.json", JSON.stringify(data).slice(1, -1), {
    encoding: "utf8",
    flag: "a+",
    mode: 0o666
  });
  loading = false
});

