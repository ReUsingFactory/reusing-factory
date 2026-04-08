const SCPU=[{v:'am4',l:'AMD Ryzen AM4'},{v:'am3',l:'AMD AM3+'}];
const SMB=[{v:'lga1151',l:'LGA 1156 / 1155 / 1150 / 1151 / 1200'},{v:'lga1366',l:'LGA 1366 / Sockel B'},{v:'lga1700',l:'LGA 1700'},{v:'lga2011',l:'LGA 2011-0 / 2011-v3'},{v:'lga2011oc',l:'LGA 2011-v3 ASUS OC (2084 Pins)'},{v:'lga2066',l:'LGA 2066'},{v:'lga1851',l:'LGA 1851'},{v:'am5',l:'SOCKEL AM5'}];
const PR={am4:104,am3:104,lga1151:109,lga1366:129,lga1700:145,lga2011:145,lga2011oc:155,lga2066:145,lga1851:155,am5:155};
const CPUPR={'bent':70,'bent_self':80,'1-2':80,'3-6':105,'6+':105};
const MWT=0.19,SH={de:6.90,eu:16.90},VP={cpu:30,mainboard:45};
let lang='de',cfg={},akS={},photoCount=0;

function t(k){return(T[lang]&&T[lang][k])||T.de[k]||k}
function chk5(){var b=document.getElementById('s5next');if(b)b.disabled=!(cfg.country&&cfg.cname&&cfg.cemail);}
function submitOrder(){var sl=(cfg.hw==='cpu'?SCPU:SMB).find(function(s){return s.v===cfg.sock;}),tot=cT();var d={access_key:'55063975-8c2f-4676-8af1-a36886eb2297',subject:'Neuer Auftrag – ReUsing Factory',from_name:'ReUsing Factory Website','Hardware-Typ':cfg.hw==='cpu'?'CPU Pin Reparatur':'Mainboard Sockel Reparatur','Sockel':sl?sl.l:cfg.sock,'Nur verbogen':cfg.bent==='ja'?'Ja':'Nein','Abgebrochene Pins':cfg.pins||'—','Eigenversuch':cfg.self==='ja'?'Ja':'Nein','Zerlegung durch uns':cfg.hw==='mainboard'?(cfg.disasm==='nein'?'Ja (+50€)':'Nein, bereits zerlegt'):'—','VIP Express':cfg.vip==='ja'?'Ja':'Nein','Schadensbeschreibung':cfg.dmg||'—','Versand':cfg.country==='de'?'Deutschland (6,90€)':'EU-Ausland (16,90€)','Kundenname':cfg.cname||'','Kunden-Email':cfg.cemail||'','Netto':fm(tot.n),'MwSt (19%)':fm(tot.m),'Brutto Gesamt':fm(tot.b),'AGB akzeptiert':'Ja','Widerrufsbelehrung gelesen':'Ja','Dienstleistungsbeginn vor Widerrufsfrist':'Ja','Zeitstempel':new Date().toISOString()};fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)}).catch(function(){});}
function aT(){document.querySelectorAll('[data-t]').forEach(el=>{el.innerHTML=t(el.dataset.t)});}
function sL(l){lang=l;document.querySelectorAll('.lb').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));aT();if(document.getElementById('cfg-overlay').classList.contains('open')){document.getElementById('cfg-tt').textContent=t(cfg.hw==='cpu'?'cfg_cpu':'cfg_mb');bS();}if(document.getElementById('page-ankauf').classList.contains('active'))agos(akStep);}
function sp(id){closeCfg();document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById('page-'+id).classList.add('active');document.querySelectorAll('.nlinks button').forEach(b=>b.classList.remove('active'));var nb=document.getElementById('nb-'+id);if(nb)nb.classList.add('active');document.getElementById('app').scrollTop=0;if(id==='ankauf')agos(0);}
// CONFIGURATOR
var cs=1,ct=7;
function openCfg(hw){cfg={hw:hw,sock:null,bent:null,pins:null,self:null,disasm:null,vip:null,dmg:'',country:'de',cname:'',cemail:'',addr:{}};photoCount=0;cfgFiles=[];cs=1;ct=hw==='mainboard'?6:7;document.getElementById('cfg-tt').textContent=t(hw==='cpu'?'cfg_cpu':'cfg_mb');bPb();bS();document.getElementById('cfg-overlay').classList.add('open');document.body.style.overflow='hidden';}
function closeCfg(){document.getElementById('cfg-overlay').classList.remove('open');document.body.style.overflow='';}
function cPos(){var s=cfg.hw==='mainboard'?[1,3,4,5,6,7]:[1,2,3,4,5,6,7];return s.indexOf(cs)+1;}
function bPb(){var pb=document.getElementById('pbar');pb.innerHTML='';var p=cPos();for(var i=1;i<=ct;i++){var d=document.createElement('div');d.className='ps'+(i<=p?' done':'');pb.appendChild(d);}document.getElementById('sctr').textContent=p+' / '+ct;}
function gS(n){cs=n;bPb();bS();}
function bS(){
  var c=document.getElementById('cfg-s'),h='<div class="cstep active">',isMB=cfg.hw==='mainboard';
  if(cs===1){
    h+='<div class="sq">'+t('s1q')+'</div><div class="tgrid">';
    (cfg.hw==='cpu'?SCPU:SMB).forEach(function(s){h+='<div class="tile'+(cfg.sock===s.v?' sel':'')+'" onclick="cfg.sock=\''+s.v+'\';gS(cfg.hw===\'mainboard\'?3:2)">'+s.l+'</div>';});
    h+='</div><div class="cnav"><span></span></div>';
  }else if(cs===2){
    h+='<div class="sq">'+t('s2bent')+'</div><div class="s2row"><img src="goldpin.png" class="s2icon" alt="Pin"><div class="s2btns s2b2">';
    h+='<div class="tile'+(cfg.bent==='ja'?' sel':'')+'" onclick="cfg.bent=\'ja\';cfg.pins=null;bS()"><strong>'+t('tY')+'</strong></div>';
    h+='<div class="tile'+(cfg.bent==='nein'?' sel':'')+'" onclick="cfg.bent=\'nein\';bS()"><strong>'+t('tN')+'</strong></div>';
    h+='</div></div>';
    if(cfg.bent==='nein'){
      h+='<div class="sq" style="margin-top:22px">'+t('s2p')+'</div><div class="s2row"><img src="goldpin.png" class="s2icon" alt="Pin"><div class="s2btns">';
      [['1-2',t('p12')],['3-6',t('p36')],['6+',t('p6p')]].forEach(function(a){h+='<div class="tile'+(cfg.pins===a[0]?' sel':'')+'" onclick="cfg.pins=\''+a[0]+'\';bS()"><strong>'+a[1]+'</strong></div>';});
      h+='</div></div>';
    }
    if(cfg.bent==='ja'||(cfg.bent==='nein'&&cfg.pins)){
      var sq=cfg.bent==='ja'?t('s2s_bent'):t('s2s');
      h+='<div class="sq" style="margin-top:22px">'+sq+'</div><div class="s2row"><span class="s2icon s2tool">🛠️</span><div class="s2btns s2b2">';
      h+='<div class="tile'+(cfg.self==='ja'?' sel':'')+'" onclick="cfg.self=\'ja\';bS()"><strong>'+t('tY')+'</strong></div>';
      h+='<div class="tile'+(cfg.self==='nein'?' sel':'')+'" onclick="cfg.self=\'nein\';bS()"><strong>'+t('tN')+'</strong></div>';
      h+='</div></div>';
      if(cfg.self==='nein')h+='<div class="hintbox" style="display:block">'+t('hint_s')+'</div>';
    }
    var can2=cfg.bent&&cfg.self&&(cfg.bent==='ja'||cfg.pins);
    h+='<div class="cnav"><button class="bbk" onclick="gS(1)">'+t('bB')+'</button><button class="bnx"'+(can2?'':' disabled')+' onclick="gS(3)">'+t('bN')+'</button></div>';
  }else if(cs===3){
    h+='<div class="sq">'+t('s3q')+'</div><textarea class="ta" id="dmgtxt" rows="3" placeholder="'+t('s3ph')+'">'+(cfg.dmg||'')+'</textarea>';
    if(isMB){
      h+='<div style="margin-top:20px"><div class="sq">'+t('s3d')+'</div>';
      h+='<div class="sw-cfg"><div class="sw-imgs"><div class="sw-img-box w"><img src="Mainboard.png" alt="Falsch"><div class="sw-l w">'+t('sw1')+'</div></div><div class="sw-img-box r"><img src="zerlegt.png" alt="Richtig"><div class="sw-l r">'+t('sw2')+'</div></div></div><p style="font-size:0.8rem;color:var(--dim);margin-top:10px">'+t('swd')+'</p></div>';
      h+='<div class="tgrid" style="grid-template-columns:1fr 1fr"><div class="tile'+(cfg.disasm==='ja'?' sel':'')+'" onclick="cfg.disasm=\'ja\';bS()"><span class="ti">✅</span>'+t('s3y')+'</div><div class="tile'+(cfg.disasm==='nein'?' sel':'')+'" onclick="cfg.disasm=\'nein\';bS()"><span class="ti">🔧</span>'+t('s3n')+'</div></div></div>';
    }
    h+='<div style="margin-top:16px"><div class="sq">'+t('s3fo')+'</div><label class="obtn" style="display:inline-block;cursor:pointer;font-size:0.82rem;padding:8px 16px"><input type="file" id="phu" multiple accept="image/*" style="display:none" onchange="chkP(this)">📷 '+t('s3fo').replace(/ *\(.*\)/,'')+'</label><div id="phpr" style="margin-top:8px;display:grid;gap:4px"></div></div>';
    var cn3=!isMB||cfg.disasm;if(cfg.hw==='cpu'&&cfg.pins==='6+'&&photoCount<1)cn3=false;
    if(cfg.hw==='cpu'&&cfg.pins==='6+')h+='<div class="hintbox" style="display:block">'+t('ph_req')+'</div>';
    h+='<div class="cnav"><button class="bbk" onclick="svD();gS(cfg.hw===\'mainboard\'?1:2)">'+t('bB')+'</button><button class="bnx" id="s3next"'+(cn3?'':' disabled')+' onclick="svD();gS(4)">'+t('bN')+'</button></div>';
  }else if(cs===4){
    var vc=VP[cfg.hw]||35;
    h+='<div class="sq">'+t('s4v')+'</div><p style="font-size:0.85rem;color:var(--dim);margin-bottom:16px">'+t('s4vd')+'</p>';
    h+='<div class="tgrid" style="grid-template-columns:1fr 1fr"><div class="tile'+(cfg.vip==='ja'?' sel':'')+'" onclick="cfg.vip=\'ja\';bS()"><span class="ti">⚡</span>'+t('tY')+' (+'+vc+' €)</div><div class="tile'+(cfg.vip==='nein'?' sel':'')+'" onclick="cfg.vip=\'nein\';bS()"><span class="ti">⏱️</span>'+t('tN')+'</div></div>';
    h+='<div class="cnav"><button class="bbk" onclick="gS(3)">'+t('bB')+'</button><button class="bnx"'+(cfg.vip?'':' disabled')+' onclick="gS(5)">'+t('bN')+'</button></div>';
  }else if(cs===5){
    h+='<div class="sq">'+t('s5r')+'</div><div class="tgrid" style="grid-template-columns:1fr 1fr"><div class="tile'+(cfg.country==='de'?' sel':'')+'" onclick="cfg.country=\'de\';bS()"><span class="ti"><img src="https://flagcdn.com/28x21/de.png" alt="DE"></span>'+t('s5de')+' (6,90 €)</div><div class="tile'+(cfg.country==='eu'?' sel':'')+'" onclick="cfg.country=\'eu\';bS()"><span class="ti"><img src="https://flagcdn.com/28x21/eu.png" alt="EU"></span>'+t('s5eu')+' (16,90 €)</div></div>';
    h+='<div style="margin-top:20px;display:grid;gap:10px"><div class="sq" style="margin-bottom:0">'+t('s5n')+'</div><input class="ta" id="cn" placeholder="'+t('s5n')+'" value="'+(cfg.cname||'')+'" oninput="cfg.cname=this.value;chk5()" style="resize:none"><div class="sq" style="margin-bottom:0">'+t('s5e')+'</div><input class="ta" id="ce" type="email" placeholder="'+t('s5e')+'" value="'+(cfg.cemail||'')+'" oninput="cfg.cemail=this.value;chk5()" style="resize:none"></div>';
    h+='<div class="cnav"><button class="bbk" onclick="gS(4)">'+t('bB')+'</button><button class="bnx" id="s5next"'+(cfg.country&&cfg.cname&&cfg.cemail?'':' disabled')+' onclick="gS(6)">'+t('bN')+'</button></div>';
  }else if(cs===6){
    h+=bInv();
    var needDisc=cfg.hw==='cpu'&&(cfg.pins==='6+'||cfg.self==='ja');
    if(needDisc)h+='<div class="hintbox" style="display:block;margin-bottom:12px">'+t('disc_main')+'</div>';
    h+='<div style="margin-top:16px;display:grid;gap:10px">';
    h+='<label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:0.86rem"><input type="checkbox" class="cfgck" style="margin-top:3px;flex-shrink:0;width:18px;height:18px"> <span>'+t('s6a')+'</span></label>';
    h+='<label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:0.86rem"><input type="checkbox" class="cfgck" style="margin-top:3px;flex-shrink:0;width:18px;height:18px"> <span>'+t('s6a_wid')+'</span></label>';
    h+='<label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:0.86rem"><input type="checkbox" class="cfgck" style="margin-top:3px;flex-shrink:0;width:18px;height:18px"> <span>'+t('s6a_dl')+'</span></label>';
    if(needDisc)h+='<label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:0.86rem"><input type="checkbox" class="cfgck" style="margin-top:3px;flex-shrink:0;width:18px;height:18px"> <span>'+t('disc_main_ck')+'</span></label>';
    h+='</div>';
    h+='<div class="cnav"><button class="bbk" onclick="gS(5)">'+t('bB')+'</button><button class="bnx" id="pbtn" disabled onclick="submitOrder();gS(7)">'+t('bN')+'</button></div>';
  }else if(cs===7){
    var pr=gP();
    if(pr===null){
      h+='<div style="text-align:center;padding:24px"><div style="font-size:2.5rem;margin-bottom:12px">📩</div><p style="font-size:1rem;margin-bottom:16px">'+t('inq')+'</p><button class="obtn" onclick="subO(\'inq\')">'+t('bS')+'</button></div>';
    }else{
      var tot=cT();
      h+='<div style="text-align:center;margin-bottom:24px"><div style="font-family:\'Share Tech Mono\',monospace;font-size:0.8rem;color:var(--dim);margin-bottom:4px">'+t('iT')+'</div><div style="font-size:2.2rem;font-weight:900;color:var(--orange);text-shadow:0 0 20px var(--orange-glow)">'+fm(tot.b)+'</div></div>';
      h+='<div id="paypal-btn" style="margin-bottom:14px"></div>';
      h+='<button class="obtn" style="width:100%;background:transparent;color:var(--blue);border:1px solid var(--blue);box-shadow:0 0 8px var(--blue-glow)" onclick="showBankAddr()">'+t('pBK')+'</button>';
    }
  }
  h+='</div>';c.innerHTML=h;
  var cks=document.querySelectorAll('.cfgck');if(cks.length)cks.forEach(function(ck){ck.onchange=function(){var all=true;cks.forEach(function(c){if(!c.checked)all=false;});document.getElementById('pbtn').disabled=!all;};});
  var ppC=document.getElementById('paypal-btn');if(ppC&&window.paypal_sdk){paypal_sdk.Buttons({style:{layout:'vertical',color:'gold',shape:'rect',label:'pay',height:45},createOrder:function(d,a){return a.order.create({purchase_units:[{description:(cfg.hw==='cpu'?'CPU Pin Reparatur':'Mainboard Sockel Reparatur'),amount:{currency_code:'EUR',value:cT().b.toFixed(2)}}]});},onApprove:function(d,a){return a.order.capture().then(function(){showThankYou();});},onCancel:function(){},onError:function(e){alert('PayPal Fehler: '+e);}}).render('#paypal-btn');}
}
function svD(){var e=document.getElementById('dmgtxt');if(e)cfg.dmg=e.value;}
var cfgFiles=[];
function chkP(inp){
Array.from(inp.files).forEach(function(f){if(cfgFiles.length<5)cfgFiles.push(f);});
inp.value='';photoCount=cfgFiles.length;renderCfgPhotos();
if(cfg.hw==='cpu'&&cfg.pins==='6+'){var nb=document.getElementById('s3next');if(nb)nb.disabled=photoCount<1;}}
function cfgRemovePhoto(i){cfgFiles.splice(i,1);photoCount=cfgFiles.length;renderCfgPhotos();if(cfg.hw==='cpu'&&cfg.pins==='6+'){var nb=document.getElementById('s3next');if(nb)nb.disabled=photoCount<1;}}
function renderCfgPhotos(){var el=document.getElementById('phpr');if(!el)return;el.innerHTML='';
cfgFiles.forEach(function(f,i){el.innerHTML+='<div style="display:flex;align-items:center;gap:8px;background:rgba(5,15,30,0.6);padding:6px 10px;border-radius:2px;font-size:0.78rem;color:var(--dim)"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">📎 '+f.name+'</span><span style="cursor:pointer;color:var(--red);font-weight:700" onclick="cfgRemovePhoto('+i+')">✕</span></div>';});}
function vA(){var ids=['an','as','az','ac','ae'];for(var i=0;i<ids.length;i++){if(!document.getElementById(ids[i]).value.trim()){alert(t('aM'));return false;}}cfg.country=document.getElementById('aco').value;cfg.addr={n:document.getElementById('an').value,s:document.getElementById('as').value,z:document.getElementById('az').value,c:document.getElementById('ac').value,e:document.getElementById('ae').value};return true;}
function gP(){if(cfg.hw==='cpu'){if(cfg.bent==='ja')return cfg.self==='ja'?CPUPR.bent_self:CPUPR.bent;return CPUPR[cfg.pins]||null;}return PR[cfg.sock]||null;}
function cT(){var b=gP()||0;if(cfg.hw==='mainboard'&&cfg.disasm==='nein')b+=50;if(cfg.vip==='ja')b+=(VP[cfg.hw]||45);b+=(SH[cfg.country]||6.90);var n=+(b/1.19).toFixed(2);var m=+(b-n).toFixed(2);return{n:n,m:m,b:b};}
function fm(v){return v.toFixed(2).replace('.',',')+' €';}
function bInv(){
  var b=gP(),sl=(cfg.hw==='cpu'?SCPU:SMB).find(function(s){return s.v===cfg.sock;}),sn=sl?sl.l:'—',rl=t(cfg.hw==='cpu'?'cfg_cpu':'cfg_mb');
  var h='<div class="inv"><div class="inv-r hd"><span>'+t('iP')+'</span><span class="p">'+t('iPr')+'</span></div>';
  h+='<div class="inv-r"><span>'+rl+'<br><small style="color:var(--dim)">'+sn+'</small></span><span class="p">'+fm(b)+'</span></div>';
  if(cfg.hw==='cpu'){h+='<div class="inv-r" style="color:var(--ok);text-shadow:0 0 8px rgba(0,230,118,0.4)"><span>✓ '+t('iClean')+'</span><span class="p">0,00 €</span></div>';h+='<div class="inv-r" style="color:var(--ok);text-shadow:0 0 8px rgba(0,230,118,0.4)"><span>✓ '+t('iTest')+'</span><span class="p">0,00 €</span></div>';}
  if(cfg.hw==='mainboard'){h+='<div class="inv-r" style="color:var(--ok);text-shadow:0 0 8px rgba(0,230,118,0.4)"><span>✓ '+t('iTest')+'</span><span class="p">0,00 €</span></div>';}
  if(cfg.hw==='cpu'){var pinInfo=cfg.bent==='ja'?t('iBent'):(t('iPn')+': '+cfg.pins);h+='<div class="inv-r"><span>'+pinInfo+'</span><span class="p">—</span></div>';
  h+='<div class="inv-r"><span>'+t('iS')+': '+(cfg.self==='ja'?t('tY'):t('tN'))+'</span><span class="p">—</span></div>';}
  if(cfg.hw==='mainboard'&&cfg.disasm==='nein')h+='<div class="inv-r"><span>'+t('iD')+'</span><span class="p">'+fm(50)+'</span></div>';
  if(cfg.vip==='ja')h+='<div class="inv-r"><span>'+t('iV')+'</span><span class="p">'+fm(VP[cfg.hw]||35)+'</span></div>';
  h+='<div class="inv-r"><span>'+t('iSh')+' ('+(cfg.country==='de'?'DE':'EU')+') <small style="color:var(--dim)">'+t('iSh_dhl')+'</small></span><span class="p">'+fm(SH[cfg.country]||6.90)+'</span></div>';
  var tot=cT();
  h+='<div class="inv-r" style="border-top:2px solid var(--border)"><span>'+t('iN')+'</span><span class="p">'+fm(tot.n)+'</span></div>';
  h+='<div class="inv-r"><span>'+t('iM')+'</span><span class="p">'+fm(tot.m)+'</span></div>';
  h+='<div class="inv-r tot"><span>'+t('iT')+'</span><span class="p">'+fm(tot.b)+'</span></div></div>';
  return h;
}
function subO(m){
  var tot=cT(),h='<div style="text-align:center;padding:20px"><div style="font-size:3rem;margin-bottom:16px">✅</div><h3 style="color:var(--ok);margin-bottom:8px">'+t('thT')+'</h3>';
  if(m==='bank'){h+='<p style="color:var(--dim);margin-bottom:20px">'+t('thDB')+'</p>';h+='<div style="text-align:left;background:rgba(5,15,30,0.9);border:1px solid var(--border);border-radius:2px;padding:16px;font-family:\'Share Tech Mono\',monospace;font-size:0.82rem;margin-bottom:16px">'+t('bI')+'<br>'+t('bO')+'<br>'+t('bIB')+'<br>'+t('bBI')+'<br><br>Betrag: '+fm(tot.b)+'</div>';}
  else{h+='<p style="color:var(--dim);margin-bottom:20px">'+t('thD')+'</p>';}
  h+='<div style="text-align:left;background:rgba(41,171,226,0.06);border:1px solid var(--border);border-radius:2px;padding:16px;margin-bottom:16px"><strong style="color:var(--blue)">'+t('sT')+'</strong><br><br>'+t('sA')+'<br><br><em style="color:var(--dim);font-size:0.82rem">'+t('sH')+'</em></div>';
  h+='<button class="bbk" onclick="closeCfg()" style="margin-top:8px">'+t('bR')+'</button></div>';
  document.getElementById('cfg-s').innerHTML=h;document.getElementById('pbar').style.display='none';document.getElementById('sctr').textContent='';
}
function showBankAddr(){
  var c=document.getElementById('cfg-s');
  var h='<div class="cstep active"><div class="sq">'+t('s5a')+'</div><div style="display:grid;gap:10px">';
  h+='<input class="ta" id="an" placeholder="'+t('s5n')+'" value="'+(cfg.cname||'')+'" style="resize:none">';
  h+='<input class="ta" id="as" placeholder="'+t('s5s')+'" style="resize:none">';
  h+='<div style="display:grid;grid-template-columns:100px 1fr;gap:10px"><input class="ta" id="az" placeholder="'+t('s5z')+'" style="resize:none"><input class="ta" id="ac" placeholder="'+t('s5c')+'" style="resize:none"></div>';
  h+='<select class="ta" id="aco" style="resize:none"><option value="de"'+(cfg.country==='de'?' selected':'')+'>Deutschland</option><option value="eu"'+(cfg.country==='eu'?' selected':'')+'>EU-Ausland</option></select>';
  h+='<input class="ta" id="ae" type="email" placeholder="'+t('s5e')+'" value="'+(cfg.cemail||'')+'" style="resize:none"></div>';
  h+='<div class="cnav"><button class="bbk" onclick="gS(7)">'+t('bB')+'</button><button class="bnx" onclick="if(vA())subO(\'bank\')">'+t('bS')+'</button></div></div>';
  c.innerHTML=h;
}
function openAgb(){document.getElementById('agb-mb').innerHTML=document.getElementById('agb-txt').innerHTML;document.getElementById('agb-m-title').textContent=t('nav_agb');document.getElementById('agb-m').classList.add('open');}
function openWid(){document.getElementById('agb-mb').innerHTML=document.getElementById('wid-txt').innerHTML;document.getElementById('agb-m-title').textContent=t('nav_widerruf');document.getElementById('agb-m').classList.add('open');}
function closeAgb(){document.getElementById('agb-m').classList.remove('open');}
function sendCF(){var n=document.getElementById('cf_n').value,e=document.getElementById('cf_e').value,m=document.getElementById('cf_m').value;if(!n||!e||!m){alert(t('aM'));return;}var btn=document.querySelector('#page-kontakt .obtn');btn.disabled=true;btn.textContent='...';fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({access_key:'55063975-8c2f-4676-8af1-a36886eb2297',subject:'Kontaktanfrage – '+n,from_name:'ReUsing Factory Website',Name:n,Email:e,Nachricht:m})}).then(function(r){return r.json()}).then(function(){btn.textContent='✓ Gesendet!';btn.style.background='var(--ok)';document.getElementById('cf_n').value='';document.getElementById('cf_e').value='';document.getElementById('cf_m').value='';setTimeout(function(){btn.disabled=false;btn.textContent='Nachricht senden';btn.style.background='';},3000);}).catch(function(){btn.disabled=false;btn.textContent='Nachricht senden';alert('Fehler – bitte direkt per Email kontaktieren.');});}
// ANKAUF
var akStep=0,akFiles=[];
var AKL={grafikkarte:'ak_gpu',mainboard:'ak_mb',cpu:'ak_cpu',andere:'ak_other'};
function akTile(el){el.classList.toggle('sel');var v=el.dataset.val;if(akS[v])delete akS[v];else akS[v]=1;document.getElementById('an1').disabled=Object.keys(akS).length===0;}
function agos(n){akStep=n;var c=document.getElementById('ak-body'),totalSteps=5;
var pb='';for(var i=1;i<=totalSteps;i++)pb+='<div class="ps'+(i<=n?' done':'')+'"></div>';
document.getElementById('ak-pbar').innerHTML=pb;
document.getElementById('asctr').textContent=n+'/'+totalSteps;
if(n===0){renderAkIntro(c);}
else if(n===1){renderAkTiles(c);}
else if(n===2){renderAkDetails(c);}
else if(n===3){renderAkContact(c);}
else if(n===4){renderAkReview(c);}
else if(n===5){submitAkOrder(c);}
}
function renderAkIntro(c){
c.innerHTML='<div class="cstep active"><div class="sq">'+t('ak_intro_title')+'</div>'+
'<div id="ak-intro-scroll" style="max-height:400px;overflow-y:auto;background:rgba(5,15,30,0.9);border:1px solid var(--border);border-radius:3px;padding:20px;font-size:0.85rem;line-height:1.8;color:var(--dim)" onscroll="chkAkScroll()">'+
'<p style="margin-bottom:14px;color:var(--orange);font-weight:700;font-size:0.85rem;font-style:italic">⬇ Bitte vorher bis nach unten durchlesen, danke!</p>'+
'<p style="margin-bottom:14px;color:var(--blue);font-weight:700;font-size:1rem">Wir kaufen Ihre beschädigten Hardware-Komponenten an!</p>'+
'<ul style="margin:0 0 16px 20px;list-style:disc"><li>Grafikkarten von NVidia & AMD</li><li>Mainboards von ASUS, Gigabyte, MSI usw.</li><li>Intel XEON Gold / Platinum etc.</li><li>Intel i3 / i5 / i7 Prozessoren</li><li>AMD Ryzen</li><li>etc.</li></ul>'+
'<p style="margin-bottom:16px">Komponenten, die älter als 5 Jahre sind, sind in der Regel nicht mehr sehr interessant. Falls Sie jedoch der Meinung sind, doch etwas von Wert zu haben, geben Sie gerne Ihre Preisvorstellung ab.</p>'+
'<p style="margin-bottom:8px;color:var(--blue);font-weight:700">Voraussetzung für den Ankauf defekter Prozessoren:</p>'+
'<ul style="margin:0 0 16px 20px;list-style:disc"><li>Teile unterhalb dürfen gebrochen / abgerissen / verbogen sein</li><li>Goldkontakte unterhalb dürfen (in Maßen) beschädigt sein</li><li>Der Heatspreader (Kupferdeckel) darf Kratzer haben</li><li>Die CPU darf angemackt sein, jedoch darf die <strong style="color:var(--orange)">Platine nicht gebrochen</strong> sein</li></ul>'+
'<p style="margin-bottom:8px;color:var(--blue);font-weight:700">Voraussetzung für den Ankauf defekter Mainboards:</p>'+
'<ul style="margin:0 0 16px 20px;list-style:disc"><li>Das Board sollte durchaus noch wertig sein. Alte AM3-Boards / grüne Boards (sofern keine höherwertigen wie z.\u00A0B. Supermicro etc.) oder außergewöhnliche Nicht-Consumer-Boards kaufen wir nicht an</li><li>Der Intel- oder AMD-Sockel darf beschädigt sein</li><li>Weitere Defekte wie zum Teil durchtrennte Leiterbahnen dürfen vorhanden sein. Kein Platinenbruch und keine Boards mit etlichen abgerissenen Bauteilen</li></ul>'+
'<p style="margin-bottom:8px;color:var(--blue);font-weight:700">Was wir vermutlich nicht ankaufen:</p>'+
'<ul style="margin:0 0 16px 20px;list-style:disc"><li>RAM-Module / Arbeitsspeicher</li><li>Netzteile</li><li>Gehäuse</li><li>Komplett-PCs, es sei denn in größeren gleichartigen Chargen</li><li>Laufwerke</li><li>Festplatten / SSDs</li></ul>'+
'<p style="color:var(--ok)">Eine Anfrage schadet jedoch nie :-)</p>'+
'</div>'+
'<div class="cnav"><span></span><button class="bnx" id="ak-intro-btn" disabled onclick="agos(1)">'+t('bN')+'</button></div></div>';
}
function chkAkScroll(){var el=document.getElementById('ak-intro-scroll');if(!el)return;if(el.scrollTop+el.clientHeight>=el.scrollHeight-20){var b=document.getElementById('ak-intro-btn');if(b)b.disabled=false;}}
function renderAkTiles(c){
c.innerHTML='<div class="cstep active"><div class="sq">'+t('ak_s1q')+'</div><div class="tgrid">'+
'<div class="tile'+(akS.grafikkarte?' sel':'')+'" data-val="grafikkarte" onclick="akTile(this)"><span class="ti">🎮</span>'+t('ak_gpu')+'</div>'+
'<div class="tile'+(akS.mainboard?' sel':'')+'" data-val="mainboard" onclick="akTile(this)"><span class="ti">🖥️</span>'+t('ak_mb')+'</div>'+
'<div class="tile'+(akS.cpu?' sel':'')+'" data-val="cpu" onclick="akTile(this)"><span class="ti">💻</span>'+t('ak_cpu')+'</div>'+
'<div class="tile'+(akS.andere?' sel':'')+'" data-val="andere" onclick="akTile(this)"><span class="ti">📦</span>'+t('ak_other')+'</div>'+
'</div><div class="multi-info">'+t('ak_multi')+'</div>'+
'<div class="cnav"><button class="bbk" onclick="agos(0)">'+t('bB')+'</button><button class="bnx" id="an1"'+(Object.keys(akS).length===0?' disabled':'')+' onclick="agos(2)">'+t('bN')+'</button></div></div>';
}
var CURR={de:{s:'€',r:1},en:{s:'£',r:1.17},fr:{s:'€',r:1},it:{s:'€',r:1},pl:{s:'zł',r:0.23},es:{s:'€',r:1},nl:{s:'€',r:1}};
function getCurr(){return CURR[lang]||CURR.de;}
function akPriceInput(k){var c=getCurr();var v=document.getElementById('ap_'+k);if(!v)return;var cv=document.getElementById('apc_'+k);if(!cv)return;var val=parseFloat(v.value);if(isNaN(val)||val<=0||c.r===1){cv.textContent='';return;}cv.textContent='≈ ca. '+(val*c.r).toFixed(2).replace('.',',')+' €';}
function renderAkDetails(c){
var cur=getCurr();
var h='<div class="cstep active">';
Object.keys(akS).forEach(function(k){if(k.startsWith('_'))return;
var l=t(AKL[k]||'ak_other');
h+='<div style="margin-bottom:20px;background:rgba(10,25,50,0.5);border:1px solid var(--border);border-radius:3px;padding:16px"><div style="font-family:\'Share Tech Mono\',monospace;font-size:0.8rem;color:var(--blue);margin-bottom:10px">'+l+'</div>'+
'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">'+
'<div><label style="font-size:0.72rem;color:var(--dim)">'+t('ak_ql')+'</label><input class="ta" id="aq_'+k+'" placeholder="1" value="'+(akS['_q_'+k]||'')+'" style="resize:none;margin-top:4px;font-size:16px"></div>'+
'<div><label style="font-size:0.72rem;color:var(--dim)">'+t('ak_pl')+' ('+cur.s+')</label><input class="ta" id="ap_'+k+'" placeholder="'+cur.s+'" value="'+(akS['_p_'+k]||'')+'" style="resize:none;margin-top:4px;font-size:16px" oninput="akPriceInput(\''+k+'\')"><div id="apc_'+k+'" style="font-size:0.72rem;color:var(--ok);margin-top:4px;font-family:\'Share Tech Mono\',monospace"></div></div>'+
'</div><textarea class="ta" id="af_'+k+'" rows="2" placeholder="'+t('ak_dl')+'..." style="font-size:16px">'+(akS['_d_'+k]||'')+'</textarea></div>';
});
h+='<div style="margin-top:12px"><div style="font-size:0.85rem;margin-bottom:8px">'+t('s3fo')+'</div>'+
'<label class="obtn" style="display:inline-block;cursor:pointer;font-size:0.82rem;padding:8px 16px"><input type="file" id="ak-photos" multiple accept="image/*" style="display:none" onchange="akPhotoChange(this)">📷 '+t('s3fo').replace(/ *\(.*\)/,'')+'</label>'+
'<div id="ak-photo-list" style="margin-top:8px;display:grid;gap:4px"></div></div>';
h+='<div class="cnav"><button class="bbk" onclick="saveAkDetails();agos(1)">'+t('bB')+'</button><button class="bnx" onclick="saveAkDetails();agos(3)">'+t('bN')+'</button></div></div>';
c.innerHTML=h;
renderAkPhotoList();
}
function saveAkDetails(){Object.keys(akS).forEach(function(k){if(k.startsWith('_'))return;var q=document.getElementById('aq_'+k),p=document.getElementById('ap_'+k),d=document.getElementById('af_'+k);if(q)akS['_q_'+k]=q.value;if(p)akS['_p_'+k]=p.value;if(d)akS['_d_'+k]=d.value;});}
function akPhotoChange(inp){
Array.from(inp.files).forEach(function(f){if(akFiles.length<5)akFiles.push(f);});
inp.value='';renderAkPhotoList();
}
function akRemovePhoto(i){akFiles.splice(i,1);renderAkPhotoList();}
function renderAkPhotoList(){var el=document.getElementById('ak-photo-list');if(!el)return;el.innerHTML='';
akFiles.forEach(function(f,i){el.innerHTML+='<div style="display:flex;align-items:center;gap:8px;background:rgba(5,15,30,0.6);padding:6px 10px;border-radius:2px;font-size:0.78rem;color:var(--dim)"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">📎 '+f.name+'</span><span style="cursor:pointer;color:var(--red);font-weight:700" onclick="akRemovePhoto('+i+')">✕</span></div>';});}
function renderAkContact(c){
c.innerHTML='<div class="cstep active"><div class="sq">'+t('s5n')+'</div><div style="display:grid;gap:10px">'+
'<input class="ta" id="ak_cn" placeholder="'+t('s5n')+'" value="'+(akS._name||'')+'" style="resize:none;font-size:16px">'+
'<input class="ta" id="ak_ce" type="email" placeholder="'+t('ak_email')+'" value="'+(akS._email||'')+'" style="resize:none;font-size:16px">'+
'<input class="ta" id="ak_ct" placeholder="'+t('ak_tel')+'" value="'+(akS._tel||'')+'" style="resize:none;font-size:16px">'+
'<input class="ta" id="ak_ca" placeholder="'+t('ak_addr')+'" value="'+(akS._addr||'')+'" style="resize:none;font-size:16px">'+
'</div><div class="cnav"><button class="bbk" onclick="saveAkContact();agos(2)">'+t('bB')+'</button><button class="bnx" onclick="saveAkContact();if(!akS._name||!akS._email){alert(t(\'aM\'));return;}agos(4)">'+t('bN')+'</button></div></div>';
}
function saveAkContact(){var n=document.getElementById('ak_cn'),e=document.getElementById('ak_ce'),tl=document.getElementById('ak_ct'),a=document.getElementById('ak_ca');if(n)akS._name=n.value;if(e)akS._email=e.value;if(tl)akS._tel=tl.value;if(a)akS._addr=a.value;}
function renderAkReview(c){
var ls=[];var body='';
Object.keys(akS).forEach(function(k){if(k.startsWith('_'))return;
var l=t(AKL[k]||'ak_other'),q=akS['_q_'+k]||'1',p=akS['_p_'+k]||'—',d=akS['_d_'+k]||'';
var cur=getCurr(),pDisp=p+' '+cur.s;
if(cur.r!==1&&p!=='—'){var eur=(parseFloat(p)*cur.r).toFixed(2);pDisp+=' (≈ ca. '+eur.replace('.',',')+' €)';}
ls.push({label:l,qty:q,price:pDisp,details:d,key:k});
body+=l+' ('+q+'x) – '+pDisp+'\n'+(d?d+'\n':'');
});
var h='<div class="cstep active"><div class="sq">'+t('ak_s3q')+'</div>';
h+='<div style="background:rgba(5,15,30,0.9);border:1px solid var(--border);border-radius:3px;padding:16px;margin-bottom:14px">';
ls.forEach(function(it){h+='<div style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--border)"><strong style="color:var(--blue)">'+it.label+'</strong> ('+it.qty+'x) — '+it.price+(it.details?'<br><span style="font-size:0.82rem;color:var(--dim)">'+it.details+'</span>':'')+'</div>';});
h+='<div style="font-size:0.82rem;color:var(--dim)">'+t('s5n')+': '+akS._name+'<br>'+t('ak_email')+': '+akS._email+(akS._tel?'<br>'+t('ak_tel').replace(' (optional)','')+': '+akS._tel:'')+(akS._addr?'<br>'+t('ak_addr').replace(' (optional)','')+': '+akS._addr:'')+'</div>';
if(akFiles.length>0)h+='<div style="font-size:0.78rem;color:var(--dim);margin-top:8px">📎 '+akFiles.length+' Foto(s)</div>';
h+='</div>';
h+='<div class="cnav"><button class="bbk" onclick="agos(3)">'+t('bB')+'</button><button class="bnx" id="ak-send-btn" onclick="agos(5)">'+t('bS')+'</button></div></div>';
c.innerHTML=h;
}
function submitAkOrder(c){
var items=[];
Object.keys(akS).forEach(function(k){if(k.startsWith('_'))return;
var l=t(AKL[k]||'ak_other'),q=akS['_q_'+k]||'1',p=akS['_p_'+k]||'—',d=akS['_d_'+k]||'';
var cur=getCurr(),pDisp=p+' '+cur.s;
if(cur.r!==1&&p!=='—'){var eur=(parseFloat(p)*cur.r).toFixed(2);pDisp+=' (ca. '+eur.replace('.',',')+' €)';}
items.push(l+' ('+q+'x) – '+pDisp+(d?' | '+d:''));
});
var data={access_key:'55063975-8c2f-4676-8af1-a36886eb2297',subject:'Ankaufsanfrage – ReUsing Factory',from_name:'ReUsing Factory Website',Name:akS._name||'',Email:akS._email||'',Telefon:akS._tel||'—',Adresse:akS._addr||'—',Artikel:items.join('\n'),Fotos:akFiles.length>0?akFiles.length+' Foto(s) (separat per Email)':'Keine'};
c.innerHTML='<div style="text-align:center;padding:40px"><div style="font-size:2rem;margin-bottom:12px">⏳</div><p style="color:var(--dim)">Wird gesendet...</p></div>';
fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)}).then(function(r){return r.json()}).then(function(){
c.innerHTML='<div style="text-align:center;padding:40px"><div style="font-size:3rem;margin-bottom:16px">✅</div><h3 style="color:var(--ok);margin-bottom:12px">'+t('ak_confirm')+'</h3><button class="bbk" onclick="resetAk()" style="margin-top:16px">'+t('bR')+'</button></div>';
}).catch(function(){
c.innerHTML='<div style="text-align:center;padding:40px"><div style="font-size:3rem;margin-bottom:16px">❌</div><p style="color:var(--red);margin-bottom:12px">Fehler – bitte direkt per Email: kontakt@reusing-factory.de</p><button class="bbk" onclick="agos(4)">'+t('bB')+'</button></div>';
});
}
function resetAk(){akS={};akFiles=[];agos(0);}
function saveCfg(){try{sessionStorage.setItem('rfcfg',JSON.stringify(cfg));}catch(e){}}

var revAll=false;
function revCard(r){return '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:10px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-weight:700;color:var(--blue);font-size:0.9rem">'+r.n+'</span><span style="font-family:\'Share Tech Mono\',monospace;font-size:0.72rem;color:var(--dim)">'+r.d+'</span></div><p style="font-size:0.84rem;color:var(--dim);line-height:1.6">'+r.t+'</p></div>';}
function renderRev(){var c=document.getElementById('rev-list');if(!c)return;c.innerHTML='';for(var i=0;i<3&&i<REV.length;i++)c.innerHTML+=revCard(REV[i]);}
function openRevModal(m){var md=document.getElementById('rev-modal'),ti=document.getElementById('rev-modal-title'),bd=document.getElementById('rev-modal-body');
if(m==='all'){ti.textContent=t('rev_title');bd.innerHTML='';for(var i=0;i<REV.length;i++)bd.innerHTML+=revCard(REV[i]);}
else{ti.textContent=t('rev_write');bd.innerHTML='<div style="display:grid;gap:10px"><input class="ta" id="rv_n" placeholder="'+t('s5n')+'" style="resize:none"><textarea class="ta" id="rv_t" rows="4" placeholder="'+t('rev_ph')+'"></textarea><div style="background:rgba(5,15,30,0.6);border:1px solid var(--border);border-radius:6px;padding:10px"><div style="font-size:0.72rem;color:var(--dim);margin-bottom:6px;font-family:\'Share Tech Mono\',monospace">Emojis</div><div style="display:flex;flex-wrap:wrap;gap:4px" id="emo-grid"></div></div><button class="obtn" onclick="sendRev()">'+t('rev_submit')+'</button></div>';var eg=document.getElementById("emo-grid");var emos=["😊","😃","😁","😍","🥰","😎","🤩","😂","🙏","🤝","👍","👏","💪","❤️","🔥","⭐","✨","💯","🎉","🏆","✅","👌","💻","🖥️","🔧","🛠️","📦","🚀","💎","🙂","😉","🤗","😇","🫶","👋","💙","💚","🧡","💛","🤞"];emos.forEach(function(e){var b=document.createElement("span");b.textContent=e;b.style.cssText="cursor:pointer;font-size:1.4rem;padding:4px;border-radius:4px;transition:transform 0.15s;display:inline-block";b.onmouseover=function(){this.style.transform="scale(1.3)"};b.onmouseout=function(){this.style.transform="scale(1)"};b.onclick=function(){var ta=document.getElementById("rv_t");var s=ta.selectionStart;ta.value=ta.value.slice(0,s)+e+ta.value.slice(s);ta.focus();ta.selectionStart=ta.selectionEnd=s+e.length};eg.appendChild(b)});}
md.style.display='flex';}
function closeRevModal(){document.getElementById('rev-modal').style.display='none';}
function sendRev(){var n=document.getElementById('rv_n').value,tx=document.getElementById('rv_t').value;if(!n||!tx){alert(t('aM'));return;}fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({access_key:'55063975-8c2f-4676-8af1-a36886eb2297',subject:'Neue Bewertung – '+n,from_name:'ReUsing Factory Website',Name:n,Bewertung:tx})}).then(function(){alert('Danke!');closeRevModal();}).catch(function(){alert('Fehler');});}
window.addEventListener('DOMContentLoaded',function(){var ul=new URLSearchParams(location.search).get('lang'),nl2=navigator.language.slice(0,2),sup=['de','en','fr','it','pl','es','nl'];lang=sup.includes(ul)?ul:(sup.includes(nl2)?nl2:'de');document.querySelectorAll('.lb').forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang);});aT();renderRev();
var ps=new URLSearchParams(location.search);if(ps.get('paid')==='1'){try{var sc=sessionStorage.getItem('rfcfg');if(sc)cfg=JSON.parse(sc);sessionStorage.removeItem('rfcfg');}catch(e){}showThankYou();}else{sp('home');}});
function showThankYou(){document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});var pg=document.getElementById('page-home');pg.classList.add('active');pg.innerHTML='<div style="max-width:700px;margin:60px auto;padding:20px;text-align:center"><div style="font-size:4rem;margin-bottom:20px">✅</div><h2 style="color:var(--ok);font-size:1.6rem;margin-bottom:12px">'+t('thT')+'</h2><p style="color:var(--dim);font-size:1rem;margin-bottom:28px">'+t('thD')+'</p><div style="text-align:left;background:rgba(41,171,226,0.06);border:1px solid var(--border);border-radius:3px;padding:20px;margin-bottom:20px"><strong style="color:var(--blue);font-size:1rem">'+t('sT')+'</strong><br><br><span style="font-size:1.05rem;color:var(--text)">'+t('sA')+'</span><br><br><em style="color:var(--dim);font-size:0.85rem">'+t('sH')+'</em></div><button class="obtn" onclick="location.href=location.pathname" style="margin-top:12px">↺ Zurück zur Startseite</button></div>';}
