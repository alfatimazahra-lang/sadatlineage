import fs from 'fs';
const s = fs.readFileSync('ziyarat-seed.sql','utf8');
const m = s.match(/values \('ashura','ashura','ashura','([\s\S]*)','([\s\S]*)','([\s\S]*)'\) on conflict/);
const q = t => "'" + t.replace(/'/g,"''") + "'";
const cut = (t,n) => { const L=t.split('\n'), p=Math.ceil(L.length/n), o=[]; for(let i=0;i<n;i++) o.push(L.slice(i*p,(i+1)*p).join('\n')); return o; };
const A=cut(m[1],5), T=cut(m[2],5), E=cut(m[3],5);
for (let i=0;i<5;i++){
  const st = i
    ? `update public.ziyarats set arabic=arabic||${q('\n'+A[i])}, transliteration=transliteration||${q('\n'+T[i])}, translation=translation||${q('\n'+E[i])} where id='ashura';`
    : `insert into public.ziyarats(id,title_ar,title_en,arabic,transliteration,translation,category) values ('ashura','Ziyarat Ashura','Ziyarat Ashura',${q(A[0])},${q(T[0])},${q(E[0])},'ziyarat') on conflict (id) do update set arabic=excluded.arabic, transliteration=excluded.transliteration, translation=excluded.translation;`;
  fs.writeFileSync('a'+i+'.sql', st);
}
console.log('ready');
