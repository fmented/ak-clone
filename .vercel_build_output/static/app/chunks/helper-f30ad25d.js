import{b as n}from"./paths-28a87002.js";async function o({session:r}){return r.user?{}:{status:302,redirect:n+"/login"}}async function s({session:r}){return r.user?{status:302,redirect:n+"/home"}:{}}function u(r){const t=new Uint16Array(r.length);for(let e=0;e<t.length;e++)t[e]=r.charCodeAt(e);const a=String.fromCharCode(...new Uint8Array(t.buffer));return btoa(a)}export{u as h,o as l,s as r};