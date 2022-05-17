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
        console.log(err);
        console.log(data);
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
        console.log(req.params.gameID);
        fs.writeFile(
            __dirname + "/" + "juegos.json",
            JSON.stringify(juegos_new),
            "utf8",
            function (err, data) {
                console.log(err);
                res.end(err);
            }
        );
        res.end(JSON.stringify(juegos_new));
    });
};
