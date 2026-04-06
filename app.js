const SCPU=[{v:'am4',l:'AMD Ryzen AM4'},{v:'am3',l:'AMD AM3+'}];
const SMB=[{v:'lga1151',l:'LGA 1156 / 1155 / 1150 / 1151 / 1200'},{v:'lga1366',l:'LGA 1366 / Sockel B'},{v:'lga1700',l:'LGA 1700'},{v:'lga2011',l:'LGA 2011-0 / 2011-v3'},{v:'lga2011oc',l:'LGA 2011-v3 ASUS OC (2084 Pins)'},{v:'lga2066',l:'LGA 2066'},{v:'lga1851',l:'LGA 1851'},{v:'am5',l:'SOCKEL AM5'}];
const PR={am4:104,am3:104,lga1151:109,lga1366:129,lga1700:145,lga2011:145,lga2011oc:155,lga2066:145,lga1851:155,am5:155};
const CPUPR={'bent':70,'bent_self':80,'1-2':80,'3-6':105,'6+':105};
const MWT=0.19,SH={de:6.90,eu:16.90},VP={cpu:30,mainboard:45};
let lang='de',cfg={},akS={},photoCount=0;

function t(k){return(T[lang]&&T[lang][k])||T.de[k]||k}
function chk5(){var b=document.getElementById('s5next');if(b)b.disabled=!(cfg.country&&cfg.cname&&cfg.cemail);}
function submitOrder(){var sl=(cfg.hw==='cpu'?SCPU:SMB).find(function(s){return s.v===cfg.sock;}),tot=cT();var d={access_key:'55063975-8c2f-4676-8af1-a36886eb2297',subject:'Neuer Auftrag – ReUsing Factory',from_name:'ReUsing Factory Website','Hardware-Typ':cfg.hw==='cpu'?'CPU Pin Reparatur':'Mainboard Sockel Reparatur','Sockel':sl?sl.l:cfg.sock,'Nur verbogen':cfg.bent==='ja'?'Ja':'Nein','Abgebrochene Pins':cfg.pins||'—','Eigenversuch':cfg.self==='ja'?'Ja':'Nein','Zerlegung durch uns':cfg.hw==='mainboard'?(cfg.disasm==='nein'?'Ja (+50€)':'Nein, bereits zerlegt'):'—','VIP Express':cfg.vip==='ja'?'Ja':'Nein','Schadensbeschreibung':cfg.dmg||'—','Versand':cfg.country==='de'?'Deutschland (6,90€)':'EU-Ausland (16,90€)','Kundenname':cfg.cname||'','Kunden-Email':cfg.cemail||'','Netto':fm(tot.n),'MwSt (19%)':fm(tot.m),'Brutto Gesamt':fm(tot.b)};fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)}).catch(function(){});}
function aT(){document.querySelectorAll('[data-t]').forEach(el=>{el.innerHTML=t(el.dataset.t)});}
function sL(l){lang=l;document.querySelectorAll('.lb').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));aT();if(document.getElementById('cfg-overlay').classList.contains('open')){document.getElementById('cfg-tt').textContent=t(cfg.hw==='cpu'?'cfg_cpu':'cfg_mb');bS();}}
function sp(id){closeCfg();document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById('page-'+id).classList.add('active');document.querySelectorAll('.nlinks button').forEach(b=>b.classList.remove('active'));var nb=document.getElementById('nb-'+id);if(nb)nb.classList.add('active');document.getElementById('app').scrollTop=0;}
// CONFIGURATOR
var cs=1,ct=7;
function openCfg(hw){cfg={hw:hw,sock:null,bent:null,pins:null,self:null,disasm:null,vip:null,dmg:'',country:'de',cname:'',cemail:'',addr:{}};photoCount=0;cs=1;ct=hw==='mainboard'?6:7;document.getElementById('cfg-tt').textContent=t(hw==='cpu'?'cfg_cpu':'cfg_mb');bPb();bS();document.getElementById('cfg-overlay').classList.add('open');document.body.style.overflow='hidden';}
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
    h+='<div class="sq">'+t('s2bent')+'</div><div class="s2row"><img src="Goldpin.png" class="s2icon" alt="Pin"><div class="s2btns s2b2">';
    h+='<div class="tile'+(cfg.bent==='ja'?' sel':'')+'" onclick="cfg.bent=\'ja\';cfg.pins=null;bS()"><strong>'+t('tY')+'</strong></div>';
    h+='<div class="tile'+(cfg.bent==='nein'?' sel':'')+'" onclick="cfg.bent=\'nein\';bS()"><strong>'+t('tN')+'</strong></div>';
    h+='</div></div>';
    if(cfg.bent==='nein'){
      h+='<div class="sq" style="margin-top:22px">'+t('s2p')+'</div><div class="s2row"><img src="Goldpin.png" class="s2icon" alt="Pin"><div class="s2btns">';
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
    h+='<div style="margin-top:16px"><div class="sq">'+t('s3fo')+'</div><input type="file" id="phu" multiple accept="image/*" style="background:rgba(5,15,30,0.9);border:1px solid var(--border2);color:var(--text);padding:10px;border-radius:2px;width:100%;font-size:0.84rem" onchange="chkP(this)"><div id="phpr" style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"></div></div>';
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
function chkP(i){var p=document.getElementById('phpr');p.innerHTML='';if(i.files.length>5){alert('Max 5');i.value='';photoCount=0;return;}photoCount=i.files.length;Array.from(i.files).forEach(function(f){var r=new FileReader();r.onload=function(e){p.innerHTML+='<img src="'+e.target.result+'" style="height:50px;border:1px solid var(--border);border-radius:2px">';};r.readAsDataURL(f);});if(cfg.hw==='cpu'&&cfg.pins==='6+'){var nb=document.getElementById('s3next');if(nb)nb.disabled=photoCount<1;}}
function vA(){var ids=['an','as','az','ac','ae'];for(var i=0;i<ids.length;i++){if(!document.getElementById(ids[i]).value.trim()){alert(t('aM'));return false;}}cfg.country=document.getElementById('aco').value;cfg.addr={n:document.getElementById('an').value,s:document.getElementById('as').value,z:document.getElementById('az').value,c:document.getElementById('ac').value,e:document.getElementById('ae').value};return true;}
function gP(){if(cfg.hw==='cpu'){if(cfg.bent==='ja')return cfg.self==='ja'?CPUPR.bent_self:CPUPR.bent;return CPUPR[cfg.pins]||null;}return PR[cfg.sock]||null;}
function cT(){var b=gP()||0;if(cfg.hw==='mainboard'&&cfg.disasm==='nein')b+=50;if(cfg.vip==='ja')b+=(VP[cfg.hw]||45);b+=(SH[cfg.country]||6.90);var n=+(b/1.19).toFixed(2);var m=+(b-n).toFixed(2);return{n:n,m:m,b:b};}
function fm(v){return v.toFixed(2).replace('.',',')+' €';}
function bInv(){
  var b=gP(),sl=(cfg.hw==='cpu'?SCPU:SMB).find(function(s){return s.v===cfg.sock;}),sn=sl?sl.l:'—',rl=t(cfg.hw==='cpu'?'cfg_cpu':'cfg_mb');
  var h='<div class="inv"><div class="inv-r hd"><span>'+t('iP')+'</span><span class="p">'+t('iPr')+'</span></div>';
  h+='<div class="inv-r"><span>'+rl+'<br><small style="color:var(--dim)">'+sn+'</small></span><span class="p">'+fm(b)+'</span></div>';
  if(cfg.hw==='cpu'){var pinInfo=cfg.bent==='ja'?t('iBent'):(t('iPn')+': '+cfg.pins);h+='<div class="inv-r"><span>'+pinInfo+'</span><span class="p">—</span></div>';
  h+='<div class="inv-r"><span>'+t('iS')+': '+(cfg.self==='ja'?t('tY'):t('tN'))+'</span><span class="p">—</span></div>';}
  if(cfg.hw==='mainboard'&&cfg.disasm==='nein')h+='<div class="inv-r"><span>'+t('iD')+'</span><span class="p">'+fm(50)+'</span></div>';
  if(cfg.vip==='ja')h+='<div class="inv-r"><span>'+t('iV')+'</span><span class="p">'+fm(VP[cfg.hw]||35)+'</span></div>';
  h+='<div class="inv-r"><span>'+t('iSh')+' ('+(cfg.country==='de'?'DE':'EU')+')</span><span class="p">'+fm(SH[cfg.country]||6.90)+'</span></div>';
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
  var body='Reparaturauftrag\n\nKunde: '+(cfg.cname||'')+'\nEmail: '+(cfg.cemail||'')+'\n\nHardware: '+cfg.hw+'\nSockel: '+cfg.sock+(cfg.hw==='cpu'?'\nVerbogen: '+cfg.bent+'\nPins: '+(cfg.pins||'nur verbogen')+'\nEigenversuch: '+cfg.self:'\nZerlegung: '+cfg.disasm)+'\nVIP: '+cfg.vip+'\nVersand: '+cfg.country+'\nZahlung: '+m+'\n\nNetto: '+fm(tot.n)+'\nMwSt: '+fm(tot.m)+'\nBrutto: '+fm(tot.b);
  if(cfg.addr.n)body+='\n\nAdresse: '+cfg.addr.s+', '+cfg.addr.z+' '+cfg.addr.c;
  if(cfg.dmg)body+='\n\nSchaden: '+cfg.dmg;
  location.href='mailto:kontakt@reusing-factory.de?subject='+encodeURIComponent('Reparaturauftrag – ReUsing Factory')+'&body='+encodeURIComponent(body);
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
function openAgb(){document.getElementById('agb-mb').innerHTML=document.getElementById('agb-txt').innerHTML;document.getElementById('agb-m').classList.add('open');}
function closeAgb(){document.getElementById('agb-m').classList.remove('open');}
function sendCF(){var n=document.getElementById('cf_n').value,e=document.getElementById('cf_e').value,m=document.getElementById('cf_m').value;if(!n||!e||!m){alert(t('aM'));return;}location.href='mailto:kontakt@reusing-factory.de?subject='+encodeURIComponent('Kontaktanfrage – '+n)+'&body='+encodeURIComponent('Von: '+n+' ('+e+')\n\n'+m);}
// ANKAUF
function akTile(el){el.classList.toggle('sel');var v=el.dataset.val;if(akS[v])delete akS[v];else akS[v]=1;document.getElementById('an1').disabled=Object.keys(akS).length===0;}
function agos(n){document.querySelectorAll('#page-ankauf .cstep').forEach(function(s){s.classList.remove('active');});document.getElementById('acs'+n).classList.add('active');document.getElementById('asctr').textContent=n+'/3';for(var i=1;i<=3;i++)document.getElementById('apb'+i).classList.toggle('done',i<=n);if(n===2)rAkF();if(n===3)rAkE();}
var AKL={gpu:'ak_gpu',mainboard:'ak_mb',cpu:'ak_cpu',server:'ak_srv',sonstiges:'ak_other'};
function rAkF(){var c=document.getElementById('ak-fields');c.innerHTML='';Object.keys(akS).forEach(function(k){var l=t(AKL[k]||'ak_other');c.innerHTML+='<div style="margin-bottom:20px;background:rgba(10,25,50,0.5);border:1px solid var(--border);border-radius:3px;padding:16px"><div style="font-family:\'Share Tech Mono\',monospace;font-size:0.8rem;color:var(--blue);margin-bottom:10px">'+l+'</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px"><div><label style="font-size:0.72rem;color:var(--dim)">'+t('ak_ql')+'</label><input class="ta" type="number" id="aq_'+k+'" value="1" min="1" style="resize:none;margin-top:4px"></div><div><label style="font-size:0.72rem;color:var(--dim)">'+t('ak_pl')+'</label><input class="ta" type="number" id="ap_'+k+'" placeholder="€" style="resize:none;margin-top:4px"></div></div><textarea class="ta" id="af_'+k+'" rows="2" placeholder="'+t('ak_dl')+'..."></textarea></div>';});c.innerHTML+='<div style="margin-top:12px"><div style="font-size:0.85rem;margin-bottom:8px">'+t('s3fo')+'</div><input type="file" multiple accept="image/*" style="background:rgba(5,15,30,0.9);border:1px solid var(--border2);color:var(--text);padding:10px;border-radius:2px;width:100%;font-size:0.84rem"></div>';}
function rAkE(){var ls=[];Object.keys(akS).forEach(function(k){var l=t(AKL[k]||'ak_other'),q=(document.getElementById('aq_'+k)||{}).value||'1',p=(document.getElementById('ap_'+k)||{}).value||'—',d=(document.getElementById('af_'+k)||{}).value||'';ls.push(l+' ('+q+'x) – Preis: '+p+'€\n'+d+'\n');});var body='Ankaufsanfrage\n\n'+ls.join('---\n')+'\nBitte Name, Adresse und Tel. ergänzen.';document.getElementById('akpre').textContent=body;document.getElementById('akmbtn').href='mailto:kontakt@reusing-factory.de?subject='+encodeURIComponent('Ankaufsanfrage – ReUsing Factory')+'&body='+encodeURIComponent(body);}
function resetAk(){akS={};document.querySelectorAll('#acs1 .tile').forEach(function(t){t.classList.remove('sel');});document.getElementById('an1').disabled=true;agos(1);}
function saveCfg(){try{sessionStorage.setItem('rfcfg',JSON.stringify(cfg));}catch(e){}}

var revAll=false;
function revCard(r){return '<div style="background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:10px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-weight:700;color:var(--blue);font-size:0.9rem">'+r.n+'</span><span style="font-family:\'Share Tech Mono\',monospace;font-size:0.72rem;color:var(--dim)">'+r.d+'</span></div><p style="font-size:0.84rem;color:var(--dim);line-height:1.6">'+r.t+'</p></div>';}
function renderRev(){var c=document.getElementById('rev-list');if(!c)return;c.innerHTML='';for(var i=0;i<3&&i<REV.length;i++)c.innerHTML+=revCard(REV[i]);}
function openRevModal(m){var md=document.getElementById('rev-modal'),ti=document.getElementById('rev-modal-title'),bd=document.getElementById('rev-modal-body');
if(m==='all'){ti.textContent=t('rev_title');bd.innerHTML='';for(var i=0;i<REV.length;i++)bd.innerHTML+=revCard(REV[i]);}
else{ti.textContent=t('rev_write');bd.innerHTML='<div style="display:grid;gap:10px"><input class="ta" id="rv_n" placeholder="'+t('s5n')+'" style="resize:none"><textarea class="ta" id="rv_t" rows="4" placeholder="'+t('rev_ph')+'"></textarea><div style="background:rgba(5,15,30,0.6);border:1px solid var(--border);border-radius:6px;padding:10px"><div style="font-size:0.72rem;color:var(--dim);margin-bottom:6px;font-family:\'Share Tech Mono\',monospace">Emojis</div><div style="display:flex;flex-wrap:wrap;gap:4px" id="emo-grid"></div></div><button class="obtn" onclick="sendRev()">'+t('rev_submit')+'</button></div>';var eg=document.getElementById("emo-grid");var emos=["😊","😃","😁","😍","🥰","😎","🤩","😂","🙏","🤝","👍","👏","💪","❤️","🔥","⭐","✨","💯","🎉","🏆","✅","👌","💻","🖥️","🔧","🛠️","📦","🚀","💎","🙂","😉","🤗","😇","🫶","👋","💙","💚","🧡","💛","🤞"];emos.forEach(function(e){var b=document.createElement("span");b.textContent=e;b.style.cssText="cursor:pointer;font-size:1.4rem;padding:4px;border-radius:4px;transition:transform 0.15s;display:inline-block";b.onmouseover=function(){this.style.transform="scale(1.3)"};b.onmouseout=function(){this.style.transform="scale(1)"};b.onclick=function(){var ta=document.getElementById("rv_t");var s=ta.selectionStart;ta.value=ta.value.slice(0,s)+e+ta.value.slice(s);ta.focus();ta.selectionStart=ta.selectionEnd=s+e.length};eg.appendChild(b)});}
md.style.display='flex';}
function closeRevModal(){document.getElementById('rev-modal').style.display='none';}
function sendRev(){var n=document.getElementById('rv_n').value,tx=document.getElementById('rv_t').value;if(!n||!tx){alert(t('aM'));return;}location.href='mailto:kontakt@reusing-factory.de?subject='+encodeURIComponent('Neue Bewertung – '+n)+'&body='+encodeURIComponent('Bewertung von: '+n+'\n\n'+tx);closeRevModal();}
window.addEventListener('DOMContentLoaded',function(){var ul=new URLSearchParams(location.search).get('lang'),nl2=navigator.language.slice(0,2),sup=['de','en','fr','it','pl','es','nl'];lang=sup.includes(ul)?ul:(sup.includes(nl2)?nl2:'de');document.querySelectorAll('.lb').forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang);});aT();renderRev();
var ps=new URLSearchParams(location.search);if(ps.get('paid')==='1'){try{var sc=sessionStorage.getItem('rfcfg');if(sc)cfg=JSON.parse(sc);sessionStorage.removeItem('rfcfg');}catch(e){}showThankYou();}else{sp('home');}});
function showThankYou(){document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});var pg=document.getElementById('page-home');pg.classList.add('active');pg.innerHTML='<div style="max-width:700px;margin:60px auto;padding:20px;text-align:center"><div style="font-size:4rem;margin-bottom:20px">✅</div><h2 style="color:var(--ok);font-size:1.6rem;margin-bottom:12px">'+t('thT')+'</h2><p style="color:var(--dim);font-size:1rem;margin-bottom:28px">'+t('thD')+'</p><div style="text-align:left;background:rgba(41,171,226,0.06);border:1px solid var(--border);border-radius:3px;padding:20px;margin-bottom:20px"><strong style="color:var(--blue);font-size:1rem">'+t('sT')+'</strong><br><br><span style="font-size:1.05rem;color:var(--text)">'+t('sA')+'</span><br><br><em style="color:var(--dim);font-size:0.85rem">'+t('sH')+'</em></div><button class="obtn" onclick="location.href=location.pathname" style="margin-top:12px">↺ Zurück zur Startseite</button></div>';}
