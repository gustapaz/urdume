<script lang="ts">
import{onMount}from'svelte';import{model}from'./model';
let d:any=$state({catalog:null,busy:false,status:'Preparando os fios…',archive:[]});
const a=model('urdume',()=>{d={...a.d};},r=>window.dispatchEvent(new CustomEvent('urdume:result',{detail:r})));
const names:any={plain:'Tela',twill:'Sarja',satin:'Cetim',signal:'Brasa',earth:'Terra',lagoon:'Lagoa'};
onMount(()=>{void a.init();});
</script>
<div class="tear-console">
 <div class="console-head"><span>COMANDOS DO TEAR</span><span>{d.result ? `${d.result.intersections} ENCONTROS` : 'ESCOLHA SEUS FIOS'}</span></div>
 {#if d.catalog}<div class="settings">
 <label>Ligamento<select aria-label="Ligamento" value={d.input.weave} onchange={e=>a.change('weave',e.currentTarget.value)} disabled={d.busy}>{#each ['plain','twill','satin'] as x}<option value={x}>{names[x]}</option>{/each}</select></label>
 <label>Paleta<select aria-label="Paleta" value={d.input.palette} onchange={e=>a.change('palette',e.currentTarget.value)} disabled={d.busy}>{#each ['signal','earth','lagoon'] as x}<option value={x}>{names[x]}</option>{/each}</select></label>
 {#each [{key:'columns',label:'Fios verticais',min:12,max:48},{key:'rows',label:'Passadas',min:12,max:40},{key:'shift',label:'Deslocamento',min:0,max:9}] as c}<label><span>{c.label}<output>{d.input[c.key]}</output></span><input type="range" aria-label={c.label} min={c.min} max={c.max} step="1" value={d.input[c.key]} oninput={e=>a.change(c.key,+e.currentTarget.value)} disabled={d.busy}/></label>{/each}
 <button class="weave" disabled={d.busy} onclick={()=>a.run()}>{d.busy?'Tecendo…':'Tecer o desenho ↗'}</button>
 </div><div class="variations">{#each d.catalog.presets as preset}<button disabled={d.busy} onclick={()=>a.preset(preset)}>{preset.name} ↗</button>{/each}<span>{d.result ? `Repetição ${d.result.repeat} · maior flutuação ${d.result.longest_float}` : 'Ligue os fios para começar'}</span></div>{:else}<button onclick={()=>a.init()}>Tentar abrir o tear</button>{/if}
 <p role="status" class:error={!!d.error}>{d.error||d.status}</p>
 <details class="patterns"><summary>Guardar este desenho <span>{d.current ? `REVISÃO ${d.current.revision}` : 'ARQUIVO DE TRAMAS'}</span></summary><div class="pattern-drawer"><label>Nome do desenho<input aria-label="Nome do desenho" maxlength="48" value={d.title||''} oninput={e=>a.title(e.currentTarget.value)}/></label><button disabled={d.busy||!d.result} onclick={()=>a.save()}>{d.current&&d.owns?'Salvar alterações':'Guardar desenho'} ↗</button>{#if d.current}<button disabled={d.busy} onclick={()=>a.open(d.current.id)}>Reler do banco</button><button disabled={d.busy} onclick={()=>a.download()}>Exportar SVG ↓</button>{#if d.owns}<button disabled={d.busy} onclick={()=>a.share()}>{d.current.published?'Encerrar link':'Criar link'}</button>{/if}<button onclick={()=>a.fresh()}>Novo desenho</button>{/if}{#if d.link}<a href={d.link} target="_blank" rel="noreferrer">Abrir desenho compartilhado ↗</a>{/if}<div class="saved"><span>Desenhos desta aba ({d.archive.length})</span>{#each d.archive as x}<button onclick={()=>a.open(x.id)}>{x.title} ↗</button>{/each}</div><small>Dados sintéticos por 7 dias. Edição somente nesta aba. O SVG corresponde à revisão salva.</small></div></details>
</div>
