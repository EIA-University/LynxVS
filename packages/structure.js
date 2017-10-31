const fs = require('fs');

function getElement (name) {
    var element = {
        name: name,
        level: "black",
        icon: "/icons/custom/file.svg"
    };

    // obtengo la extension del archivo
    if (/(\.c|h)$/.test(name)) {
        element.level = "blue";
        element.icon = "/icons/c/c-original.svg";
    } else if (/bower\.json/.test(name)) {
        element.level = "red";
        element.icon = "/icons/bower/bower-original.svg"
    } else if (/(\.cpp)$/.test(name)) {
        element.level = "purple";
        element.icon = "/icons/cplusplus/cplusplus-plain.svg";
    } else if (/(\.coffee)$/.test(name)) {
        element.level = "#28334c";
        element.icon = "/icons/coffeescript/coffeescript-original.svg";
    } else if (/(\.cs)$/.test(name)) {
        element.level = "#68217a";
        element.icon = "/icons/csharp/csharp-plain.svg";
    } else if (/(\.css)$/.test(name)) {
        element.level = "#31a5d6";
        element.icon = "/icons/css3/css3-original.svg";
    } else if (/(\.css)$/.test(name)) {
        element.level = "#31a5d6";
        element.icon = "/icons/css3/css3-original.svg";
    } else if (/Dockerfile/.test(name)) {
        element.level = "#bfdbe0";
        element.icon = "/icons/docker/docker-original.svg";
    } else if (/Dockerfile/.test(name)) {
        element.level = "#bfdbe0";
        element.icon = "/icons/docker/docker-original.svg";
    } else if (/(\.net)$/.test(name)) {
        element.level = "#1071b8";
        element.icon = "/icons/docker/docker-original.svg";
    } else if (/(\.erl)$|(\.hrl)/.test(name)) {
        element.level = "#a90533";
        element.icon = "/icons/erlang/erlang-original.svg";
    } else if (/^(\.git)/.test(name)) {
        element.level = "#f34f29";
        element.icon = "/icons/git/git-original.svg";
    } else if (/(\.go)$/.test(name)) {
        element.level = "#6ad7e5";
        element.icon = "/icons/go/go-original.svg";
    } else if (/(\.go)$/.test(name)) {
        element.level = "#6ad7e5";
        element.icon = "/icons/go/go-original.svg";
    } else if (/Gruntfile\.js/.test(name)) {
        element.level = "#493310";
        element.icon = "/icons/grunt/grunt-original.svg";
    } else if (/gulpfile\.js/.test(name)) {
        element.level = "#eb4a4b";
        element.icon = "/icons/gulp/gulp-plain.svg";
    } else if (/gulpfile\.js/.test(name)) {
        element.level = "#eb4a4b";
        element.icon = "/icons/gulp/gulp-plain.svg";
    } else if (/(\.html)$/.test(name)) {
        element.level = "#f16529";
        element.icon = "/icons/html5/html5-original.svg";
    } else if (/(\.ai)$/.test(name)) {
        element.level = "#faa625";
        element.icon = "/icons/illustrator/illustrator-plain.svg";
    } else if (/(\.java)$/.test(name)) {
        element.level = "#0074bd";
        element.icon = "/icons/java/java-original.svg";
    } else if (/(\.js)$/.test(name)) {
        element.level = "#f0db4f";
        element.icon = "/icons/javascript/javascript-original.svg";
    } else if (/(\.less)$/.test(name)) {
        element.level = "#2a4d80";
        element.icon = "/icons/less/less-plain-wordmark.svg";
    } else if (/(\.ps)$/.test(name)) {
        element.level = "#80b5e2";
        element.icon = "/icons/photoshop/photoshop-plain.svg";
    } else if (/(\.php)$/.test(name)) {
        element.level = "#6181b6";
        element.icon = "/icons/php/php-plain.svg";
    } else if (/(\.py)$/.test(name)) {
        element.level = "#ffd845";
        element.icon = "/icons/python/python-plain.svg";
    } else if (/(\.rb)$/.test(name)) {
        element.level = "#d91404";
        element.icon = "/icons/ruby/ruby-plain.svg";
    } else if (/(\.sass)$/.test(name)) {
        element.level = "#cb6699";
        element.icon = "/icons/sass/sass-original.svg";
    } else if (/travis.yml/.test(name)) {
        element.level = "#bb2031";
        element.icon = "/icons/travis/travis-plain.svg";
    } else if (/travis.yml/.test(name)) {
        element.level = "#bb2031";
        element.icon = "/icons/travis/travis-plain.svg";
    } else if (/(\.pdf)$/.test(name)) {
        element.level = "#cc4b4c";
        element.icon = "/icons/custom/pdf.svg";
    } else if (/(\.png|jpg|gif)$/.test(name)) {
        element.level = "#cc4b4c";
        element.icon = "/icons/custom/pdf.svg";
    } else if (/(\.clj|cljs|cljc|edn)$/.test(name)) {
        element.level = "#91dc47";
        element.icon = "/icons/custom/clojure.png";
    } else if (/(\.ejs)$/.test(name)) {
        element.level = "black";
        element.icon = "/icons/custom/ejs.png";
    } else if (/(\.hs|lhs)$/.test(name)) {
        element.level = "#7c3679";
        element.icon = "/icons/custom/haskell.png";
    } else if (/(\.jade)$/.test(name)) {
        element.level = "#c1272d";
        element.icon = "/icons/custom/jade.svg";
    } else if (/(\.json)$/.test(name)) {
        element.level = "#606060";
        element.icon = "/icons/custom/json.png";
    } else if (/(\.lua)$/.test(name)) {
        element.level = "#000080";
        element.icon = "/icons/custom/lua.png";
    } else if (/(\.mm|C)$/.test(name)) {
        element.level = "grey";
        element.icon = "/icons/apple/apple-original.svg";
    } else if (/(\.m)$/.test(name)) {
        element.level = "#e6710f";
        element.icon = "/icons/custom/matlab.png";
    } else if (/(\.perl)$/.test(name)) {
        element.level = "#3a3c5b";
        element.icon = "/icons/custom/perl.png";
    } else if (/(\.perl)$/.test(name)) {
        element.level = "#3a3c5b";
        element.icon = "/icons/custom/perl.png";
    } else if (/(\.ps1)$/.test(name)) {
        element.level = "#277dc9";
        element.icon = "/icons/custom/powerShell.png";
    } else if (/(\.r)$/.test(name)) {
        element.level = "#2268bc";
        element.icon = "/icons/custom/r.svg";
    } else if (/(\.rs|rlib)$/.test(name)) {
        element.level = "#000000";
        element.icon = "/icons/custom/rust.png";
    } else if (/(\.scala|sc)$/.test(name)) {
        element.level = "#e40000";
        element.icon = "/icons/custom/scala.png";
    } else if (/(\.scala|sc)$/.test(name)) {
        element.level = "#e40000";
        element.icon = "/icons/custom/scala.png";
    } else if (/(\.sh)$/.test(name)) {
        element.level = "#2b3539";
        element.icon = "/icons/custom/shell.png";
    } else if (/(\.swift)$/.test(name)) {
        element.level = "#fa592c";
        element.icon = "/icons/custom/swift.png";
    } else if (/(\.db|\w+sql|\w+db)$/.test(name)) {
        element.level = "#7383bf";
        element.icon = "/icons/custom/database.svg";
    } else if (/(\.pptx|pot|pps)$/.test(name)) {
        element.level = "#cb4a32";
        element.icon = "/icons/custom/powerPoint.png";
    } else if (/(\.docx|docm|dotx|dotm|docb)$/.test(name)) {
        element.level = "#2a5699";
        element.icon = "/icons/custom/word.svg";
    } else if (/(\.xlsx|xlsm|xltx|xltm)$/.test(name)) {
        element.level = "#19754c";
        element.icon = "/icons/custom/excel.png";
    } else if (/(\.ACCDB|ACCDE|ACCDT|ACCDR)$/.test(name)) {
        element.level = "#a33639";
        element.icon = "/icons/custom/access.png";
    } else if (/(\.pub)$/.test(name)) {
        element.level = "#077467";
        element.icon = "/icons/custom/publisher.png";
    } else if (/(\.odf)$/.test(name)) {
        element.level = "#18a303";
        element.icon = "/icons/custom/loCalc.png";
    } else if (/(\.odt)$/.test(name)) {
        element.level = "#0369a3";
        element.icon = "/icons/custom/loWriter.png";
    } else if (/(\.odp)$/.test(name)) {
        element.level = "#a33e03";
        element.icon = "/icons/custom/loPress.png";
    } else if (/(\.tex)$/.test(name)) {
        element.level = "#000000";
        element.icon = "/icons/custom/latex.png";
    }


    return element;
}

function getLocal (path) {
    path =  path.split('/');
    return path[path.length-2];
}

function readAll (path) {
    var structure = {
        name: getLocal(path),
        level: "blue",
        icon: "/icons/custom/folderColor.png",
        children: []
    };

    fs.readdirSync(path).forEach(function (item) {
        if (fs.lstatSync(path + item.toString()).isDirectory()) {
            //console.log(tabs + item + ":");
            structure.children.push(readAll(path + item.toString() + '/'));
        } else {
            //console.log(tabs + item);
            structure.children.push(getElement(item.toString()));
        }
    });

    return structure;
}

module.exports = {
    getElement: getElement,
    getLocal: getLocal,
    readAll: readAll
};
