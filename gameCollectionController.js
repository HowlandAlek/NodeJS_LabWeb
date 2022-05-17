"use strict";

const { response } = require("express");
var fs = require("fs");
const { request } = require("http");

module.exports.obtener_juegos = function (req, res) {
    fs.readFile(__dirname + "/" + "juegos.json", "utf8", function (err, data) {
        console.log(err);
        console.log(data);
        res.end(data);
    });
};

module.exports.agregar_juego = function (req, res) {
    fs.readFile(__dirname + "/" + "juegos.json", "utf8", function (err, data) {
        const array = JSON.parse(data);
        console.log("Error: " + err);
        console.log("Data inicial: " + data + "\n");
        const nuevo = req.body;
        array.push(nuevo);
        fs.writeFile(
            __dirname + "/" + "juegos.json",
            JSON.stringify(array),
            "utf8",
            function (err, data) {
                console.log(err);
                res.end(err);
            }
        );
        res.end(JSON.stringify(array));
    });
};

module.exports.obtener_juego = function (req, res) {
    fs.readFile(__dirname + "/" + "juegos.json", "utf8", function (err, data) {
        const juegos = JSON.parse(data);
        const juego = juegos[req.params.gameIndex];
        console.log(juego);
        res.end(JSON.stringify(juego));
    });
};

module.exports.borrar_juego = function (req, res) {
    fs.readFile(__dirname + "/" + "juegos.json", "utf8", function (err, data) {
        const juegos = JSON.parse(data);
        const juegos_new = juegos.filter((elem) => {
            return elem.id != req.params.gameID;
        });
        console.log("Juego a eliminar: " + req.params.gameID);
        fs.writeFile(
            __dirname + "/" + "juegos.json",
            JSON.stringify(juegos_new),
            "utf8",
            function (err, data) {
                console.log("Error: " + err);
                res.end(err);
            }
        );
        res.end(JSON.stringify(juegos_new));
    });
};

//https://stackoverflow.com/questions/50920180 filter-a-javascript-array-of-strings-matching-a-sequence-of-characters
module.exports.buscar_juego_keyword = function (req, res) {
    fs.readFile(__dirname + "/" + "juegos.json", "utf8", function (err, data) {
        const juegos = JSON.parse(data);
        const keyword = req.params.keyword;
        console.log("Keyword:" + keyword);

        const juegos_filtered = juegos.filter((elem) => {
            var contains_keyword = false;
            const keyword_lowercase = keyword.toLowerCase();
            const name_lowercase = elem.nombre.toLowerCase();
            for (var i = 0; i < keyword_lowercase.length; i++) {
                console.log("KEY(i) = " + keyword_lowercase.charAt(i));
                console.log("Nombre: " + name_lowercase);
                if (name_lowercase.includes(keyword_lowercase.charAt(i))) {
                    contains_keyword = true;
                } else {
                    contains_keyword = false;
                    break;
                }
            }

            if (contains_keyword) {
                return elem;
            }
        });

        console.log(juegos_filtered);

        res.end(JSON.stringify(juegos_filtered));
    });
};
