// plugins/translate-plugin/admin/src/components/TranslateBtn/index.js
import React, { useState } from 'react';
import {
  useCMEditViewDataManager,
  useNotification,
} from '@strapi/helper-plugin';
import {
  Button, Dialog, DialogBody, DialogFooter,
  Flex, SingleSelect, SingleSelectOption, Alert,
} from '@strapi/design-system';
import { Globe } from '@strapi/icons';

/* ───────────── langues proposées ───────────── */
const LANGS = [
  { value: 'fr',    label: 'Français'  },
  { value: 'en',    label: 'English'   },
  { value: 'de',    label: 'Deutsch'   },
  { value: 'es',    label: 'Español'   },
  { value: 'it',    label: 'Italiano'  },
  { value: 'nl-NL', label: 'Nederlands'},
];

/* ---------- helpers -------------------------------------------------- */

/** Ajoute (path,value) si `check` est vrai */
const push = (arr, path, value, check = true) => {
  if (check) arr.push({ path, value });
};

/** collecte deux listes :
 *    – slateBlocks   : l’ENTIER des champs text_json
 *    – simpleEntries : titres, boutons, feuilles Slate non-vides
 */
const collectEntries = (data) => {
  const slateBlocks   = [];
  const simpleEntries = [];

  const walk = (node, path) => {
    if (Array.isArray(node)) { node.forEach((n,i)=>walk(n,`${path}.${i}`)); return; }
    if (!node || typeof node!=='object') return;

    /* 1. feuilles Slate */
    if (node.type === 'text' && typeof node.text === 'string' && node.text.trim()!=='')
      push(simpleEntries, `${path}.text`, node.text);

    /* 2. titres */
    ['Titre1','Titre2','Titre'].forEach(k =>
      push(simpleEntries, `${path}.${k}`, node[k], typeof node[k]==='string'&&node[k].trim()!=='')
    );

    /* 3. boutons */
    if (node.__component==='buttons.view-more')
      push(simpleEntries, `${path}.Bouton.button_text`, node.Bouton?.button_text,
           typeof node.Bouton?.button_text==='string'&&node.Bouton.button_text.trim()!=='');

    if (node.__component==='buttons.drop-down' || node.__component==='buttons.dropdown-article')
      (node.buttons||[]).forEach((b,i)=>
        push(simpleEntries, `${path}.buttons.${i}.button_text`, b.button_text,
             typeof b.button_text==='string'&&b.button_text.trim()!=='')
      );

    /* 4. bloc Slate complet */
    if (Array.isArray(node.text_json) && node.text_json.length)
      slateBlocks.push({ path:`${path}.text_json`, value: JSON.stringify(node.text_json) });

    /* récursion */
    Object.entries(node).forEach(([k,v])=>{
      if (k==='text' && node.type==='text') return;
      if (v && typeof v==='object') walk(v, `${path}.${k}`);
    });
  };

  ['Header','Content'].forEach(z=> data[z] && walk(data[z], z));
  return { slateBlocks, simpleEntries };
};

/* appel backend */
const translateBatch = async (entries, srcLang, dstLang) => {
  if (!entries.length) return [];
  const res = await fetch('/translate-plugin/translate',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({ entries, srcLang, dstLang })
  });
  const { translations=[] } = await res.json();
  return translations;
};

/* ---------- composant ------------------------------------------------ */

const TranslateBtn = () => {
  const { modifiedData, onChange } = useCMEditViewDataManager();
  const notify = useNotification();

  const [show,setShow] = useState(false);
  const [src,setSrc]   = useState('fr');
  const [dst,setDst]   = useState('en');
  const [busy,setBusy] = useState(false);
  const [done,setDone] = useState(false);

  const handleTranslate = async () =>{
    setBusy(true);
    try{
      /* 1. on sépare les deux listes ---------------------------------- */
      const { slateBlocks, simpleEntries } = collectEntries(modifiedData);

      /* 2-A. traduction des blocs Slate complets ---------------------- */
      const slateTrans = await translateBatch(slateBlocks, src, dst);
      slateTrans.forEach(({path,value})=>{
        try{
          const parsed = JSON.parse(value);
          onChange({ target:{ name:path, value:parsed, type:'json' } });
        }catch{/* ignore parse error */}
      });

      /* 2-B. traduction des champs simples --------------------------- */
      const simpleTrans = await translateBatch(simpleEntries, src, dst);
      simpleTrans.forEach(({path,value})=>
        onChange({ target:{ name:path, value, type:'text' } })
      );

      notify({type:'success',message:'Translation finished 🎉'});
      setDone(true);
    }catch(e){
      notify({type:'warning',message:`Translation error: ${e.message}`});
    }
    setBusy(false); setShow(false); setTimeout(()=>setDone(false),4000);
  };

  /* ----------------------------- UI -------------------------------- */
  return (
    <>
      <Button variant="secondary" fullWidth onClick={()=>setShow(true)}>
        <Globe/> Translate
      </Button>

      {show&&(
        <Dialog id="translate-dialog" isOpen title="Translate" size="S" onClose={()=>setShow(false)}>
          <DialogBody icon={<Globe/>}>
            <Flex direction="column" gap={4}>
              <SingleSelect label="Source language" value={src} onChange={setSrc}>
                {LANGS.map(l=><SingleSelectOption key={l.value} value={l.value}>{l.label}</SingleSelectOption>)}
              </SingleSelect>
              <SingleSelect label="Target language" value={dst} onChange={setDst}>
                {LANGS.map(l=><SingleSelectOption key={l.value} value={l.value}>{l.label}</SingleSelectOption>)}
              </SingleSelect>
            </Flex>
          </DialogBody>
          <DialogFooter
            startAction={<Button variant="tertiary" onClick={()=>setShow(false)}>Cancel</Button>}
            endAction={<Button loading={busy} onClick={handleTranslate}>Confirm</Button>}
          />
        </Dialog>
      )}

      {done&&(
        <Alert closeLabel="Close" onClose={()=>setDone(false)} title="Success" variant="success" action={<></>}>
          All texts have been translated.
        </Alert>
      )}
    </>
  );
};

export default TranslateBtn;
