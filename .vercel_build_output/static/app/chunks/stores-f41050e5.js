import{S as I,i as S,s as x,D as V,e as b,t as k,k as q,c as g,a as m,g as A,d,n as F,b as f,W as E,f as L,F as v,h as R,E as W,x as Y,u as w,B as C,Y as T,a1 as y}from"./vendor-3e1a4086.js";function z(e){let s,n,i=e[0].name+"",r,o,c,_,u;const p=e[2].default,a=V(p,e,e[1],null);return{c(){s=b("article"),n=b("div"),r=k(i),o=q(),c=b("div"),a&&a.c(),this.h()},l(t){s=g(t,"ARTICLE",{class:!0});var l=m(s);n=g(l,"DIV",{class:!0});var h=m(n);r=A(h,i),h.forEach(d),o=F(l),c=g(l,"DIV",{class:!0});var j=m(c);a&&a.l(j),j.forEach(d),l.forEach(d),this.h()},h(){f(n,"class","svelte-1j9j5sf"),f(c,"class","svelte-1j9j5sf"),f(s,"class",_=""+(E(e[0].class)+" svelte-1j9j5sf"))},m(t,l){L(t,s,l),v(s,n),v(n,r),v(s,o),v(s,c),a&&a.m(c,null),u=!0},p(t,[l]){(!u||l&1)&&i!==(i=t[0].name+"")&&R(r,i),a&&a.p&&l&2&&W(a,p,t,t[1],l,null,null),(!u||l&1&&_!==(_=""+(E(t[0].class)+" svelte-1j9j5sf")))&&f(s,"class",_)},i(t){u||(Y(a,t),u=!0)},o(t){w(a,t),u=!1},d(t){t&&d(s),a&&a.d(t)}}}function G(e,s,n){let{$$slots:i={},$$scope:r}=s;return e.$$set=o=>{n(0,s=C(C({},s),T(o))),"$$scope"in o&&n(1,r=o.$$scope)},s=T(s),[s,r,i]}class K extends I{constructor(s){super();S(this,s,G,z,x,{})}}const H=()=>{const e=y("__svelte__");return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:e.navigating.subscribe}},session:e.session}},B=e=>{throw new Error(`Cannot ${e} session store before subscribing`)},D={subscribe(e){const s=H().session;return D.set=s.set,D.update=s.update,s.subscribe(e)},set:()=>B("set"),update:()=>B("update")};export{K as T,D as s};