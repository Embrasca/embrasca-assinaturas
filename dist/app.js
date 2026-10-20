'use strict';
const $=id=>document.getElementById(id);
const fields=['name','role','email','phone','linkedin','whatsapp','photo-url','logo-url'];
let logoData='',photoData='',sourcePhoto=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function https(v){try{const u=new URL(v);return u.protocol==='https:'?u.href:''}catch{return ''}}
function phoneNumber(v){let n=v.replace(/\D/g,'');if(n.length===10||n.length===11)n='55'+n;return n}
function link(href,label){return `<a href="${esc(href)}" style="color:#434b50;text-decoration:none;">${esc(label)}</a>`}
function signature(){
 const name=$('name').value.trim()||'Seu nome completo',role=$('role').value.trim(),email=$('email').value.trim(),phone=$('phone').value.trim(),linkedin=https($('linkedin').value.trim());
 const photo=https($('photo-url').value.trim())||photoData,logo=https($('logo-url').value.trim())||logoData;
 const number=phoneNumber(phone),contacts=[];
 if(email)contacts.push(link('mailto:'+encodeURIComponent(email),email));
 if(phone&&number)contacts.push(link($('whatsapp').checked?'https://wa.me/'+number:'tel:+'+number,phone));
 const bottom=[link('https://embrasca.com.br','embrasca.com.br')];if(linkedin)bottom.push(link(linkedin,'LinkedIn'));
 return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Ubuntu,Arial,Helvetica,sans-serif;color:#283033;border-collapse:collapse;background-color:#ffffff;"><tr><td valign="middle" style="padding:0 18px 0 0;vertical-align:middle;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#444545" style="background-color:#444545;padding:6px;"><img src="${esc(logo)}" width="150" height="72" alt="Embrasca — Soluções Sustentáveis" style="display:block;border:0;width:150px;height:72px;"></td></tr></table></td><td valign="middle" style="border-left:1px solid #d8ddda;padding:2px 0 2px 18px;vertical-align:middle;"><div style="font-size:17px;line-height:22px;font-weight:bold;color:#283033;">${esc(name)}</div>${role?`<div style="font-size:11px;line-height:17px;color:#737a7c;">${esc(role)}</div>`:''}<div style="font-size:11px;line-height:19px;padding-top:9px;">${contacts.join('<br>')}</div><div style="font-size:10px;line-height:18px;padding-top:5px;">${bottom.join('<span style="color:#b5bcba;"> &nbsp;|&nbsp; </span>')}</div></td>${photo?`<td valign="middle" style="padding-left:20px;vertical-align:middle;"><img src="${esc(photo)}" alt="Foto de ${esc(name)}" width="80" height="80" style="display:block;width:80px;height:80px;border:0;border-radius:40px;"></td>`:''}</tr></table>`;
}
function render(){ $('signature').innerHTML=signature();$('photo-download').hidden=!photoData; }
function status(s){$('status').textContent=s}
function valid(){
 if(!$('form').reportValidity())return false;
 for(const id of ['linkedin','photo-url','logo-url'])if($(id).value.trim()&&!https($(id).value.trim())){status('Use um endereço HTTPS válido em '+(id==='linkedin'?'LinkedIn':'imagens hospedadas')+'.');$(id).focus();return false}
 const p=phoneNumber($('phone').value);if(p&&(p.length<10||p.length>15)){status('Confira o telefone com DDD e código do país.');$('phone').focus();return false}return true;
}
function download(data,name){const a=document.createElement('a');a.href=data;a.download=name;a.click()}
function blobDownload(content,type,name){const u=URL.createObjectURL(new Blob([content],{type}));download(u,name);setTimeout(()=>URL.revokeObjectURL(u),1000)}
function crop(){if(!sourcePhoto)return;const canvas=document.createElement('canvas');canvas.width=240;canvas.height=240;const ctx=canvas.getContext('2d');const size=Math.min(sourcePhoto.naturalWidth,sourcePhoto.naturalHeight)/Number($('zoom').value);const x=(sourcePhoto.naturalWidth-size)*Number($('posx').value)/100,y=(sourcePhoto.naturalHeight-size)*Number($('posy').value)/100;ctx.fillStyle='#ffffff';ctx.fillRect(0,0,240,240);ctx.drawImage(sourcePhoto,x,y,size,size,0,0,240,240);photoData=canvas.toDataURL('image/jpeg',.9);render()}
fields.forEach(id=>$(id).addEventListener('input',()=>{status('');render()}));
['zoom','posx','posy'].forEach(id=>$(id).addEventListener('input',crop));
$('form').addEventListener('submit',e=>e.preventDefault());
$('photo').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;if(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>10*1024*1024){status('Escolha JPG, PNG ou WebP de até 10 MB.');e.target.value='';return}const url=URL.createObjectURL(f),img=new Image();img.onload=()=>{sourcePhoto=img;URL.revokeObjectURL(url);$('zoom').value=1;$('posx').value=50;$('posy').value=50;$('photo-url').value='';$('photo-controls').hidden=false;crop();status('Foto adicionada. Ajuste o enquadramento na prévia.')};img.onerror=()=>{URL.revokeObjectURL(url);status('Não foi possível abrir esta imagem. Tente outro arquivo.')};img.src=url});
$('remove').onclick=()=>{sourcePhoto=null;photoData='';$('photo').value='';$('photo-url').value='';$('photo-controls').hidden=true;render()};
$('copy').onclick=async()=>{if(!valid())return;const html=signature(),plain=$('signature').innerText;try{if(!navigator.clipboard?.write||typeof ClipboardItem==='undefined')throw Error('fallback');await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([plain],{type:'text/plain'})})]);status('Assinatura copiada! Cole no Outlook com Ctrl + V e confira as imagens em um e-mail de teste.')}catch{const selection=window.getSelection(),range=document.createRange();range.selectNodeContents($('signature'));selection.removeAllRanges();selection.addRange(range);try{if(!document.execCommand('copy'))throw Error('manual');status('Assinatura copiada. Cole no Outlook e confira as imagens.')}catch{status('A assinatura está selecionada. Pressione Ctrl + C e cole no Outlook.')}}};
$('download').onclick=()=>{if(!valid())return;blobDownload('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Assinatura Embrasca</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"></head><body>'+signature()+'</body></html>','text/html','assinatura-embrasca.html');status('HTML baixado. Abra no navegador para visualizar. Confira as imagens ao instalar no Outlook.')};
$('logo-download').onclick=()=>download(logoData||'assets/logo.png','logo-embrasca.png');
$('photo-download').onclick=()=>download(photoData,'foto-assinatura.jpg');
async function init(){try{const res=await fetch('assets/logo.png');if(!res.ok)throw Error('logo');const blob=await res.blob(),image=await createImageBitmap(blob);const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;const ctx=canvas.getContext('2d');ctx.fillStyle='#444545';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0);image.close();logoData=canvas.toDataURL('image/png');render()}catch{status('Não foi possível carregar a logo. Recarregue a página antes de copiar.');$('copy').disabled=true;$('download').disabled=true}}render();init();
