import{S as v,i as x,s as z,e as o,O as I,c as s,d as i,b as e,F as c,G as _}from"./vendor-3e1a4086.js";import{b as g}from"./paths-28a87002.js";function K(k){let a,d,r,l,n,u,m,h,f,p;return document.title=d=k[0],{c(){a=o("link"),r=o("meta"),l=o("link"),n=o("link"),u=o("link"),m=o("link"),h=o("link"),f=o("meta"),p=o("meta"),this.h()},l(b){const t=I('[data-svelte="svelte-x328hf"]',document.head);a=s(t,"LINK",{rel:!0,href:!0}),r=s(t,"META",{name:!0,content:!0}),l=s(t,"LINK",{rel:!0,href:!0}),n=s(t,"LINK",{rel:!0,sizes:!0,href:!0}),u=s(t,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),m=s(t,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),h=s(t,"LINK",{rel:!0,href:!0,color:!0}),f=s(t,"META",{name:!0,content:!0}),p=s(t,"META",{name:!0,content:!0}),t.forEach(i),this.h()},h(){e(a,"rel","stylesheet"),e(a,"href",""+(g+"/global.css")),e(r,"name","description"),e(r,"content",k[1]),e(l,"rel","manifest"),e(l,"href",""+(g+"/manifest.json")),e(n,"rel","apple-touch-icon"),e(n,"sizes","152x152"),e(n,"href",""+(g+"/apple-touch-icon.png")),e(u,"rel","icon"),e(u,"type","image/png"),e(u,"sizes","32x32"),e(u,"href",""+(g+"/favicon-32x32.png")),e(m,"rel","icon"),e(m,"type","image/png"),e(m,"sizes","16x16"),e(m,"href",""+(g+"/favicon-16x16.png")),e(h,"rel","mask-icon"),e(h,"href",""+(g+"/safari-pinned-tab.svg")),e(h,"color","#5bbad5"),e(f,"name","msapplication-TileColor"),e(f,"content","#00aba9"),e(p,"name","theme-color"),e(p,"content","#ffffff")},m(b,t){c(document.head,a),c(document.head,r),c(document.head,l),c(document.head,n),c(document.head,u),c(document.head,m),c(document.head,h),c(document.head,f),c(document.head,p)},p(b,[t]){t&1&&d!==(d=b[0])&&(document.title=d),t&2&&e(r,"content",b[1])},i:_,o:_,d(b){i(a),i(r),i(l),i(n),i(u),i(m),i(h),i(f),i(p)}}}function L(k,a,d){let{title:r}=a,{description:l}=a;return k.$$set=n=>{"title"in n&&d(0,r=n.title),"description"in n&&d(1,l=n.description)},[r,l]}class E extends v{constructor(a){super();x(this,a,L,K,z,{title:0,description:1})}}export{E as P};