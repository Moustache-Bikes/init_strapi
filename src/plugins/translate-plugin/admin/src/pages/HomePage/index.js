// plugins/translate-plugin/admin/src/pages/HomePage/index.js
import React,{useEffect,useState} from 'react';
import {
  Box, Grid, Card, CardBody,
  Typography, DatePicker, Button
} from '@strapi/design-system';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';
import { Calendar } from '@strapi/icons';

const day = 24*3600;               // seconds

const isoToSec = (d)=>Math.floor(new Date(d).getTime()/1000);

const HomePage = () => {
  const notify   = useNotification();
  const { get } = useFetchClient();   // GET, POST, put, del…
  const today    = new Date();
  const weekAgo  = new Date(Date.now()-7*day*1000);

  const [from,setFrom]     = useState(weekAgo);
  const [to,setTo]         = useState(today);
  const [costs,setCosts]   = useState(null);
  const [usage,setUsage]   = useState(null);
  const [loading,setLoad]  = useState(false);

  const load = async () => {
    setLoad(true);
    try {
      const params = { from: isoToSec(from).toString(), to: isoToSec(to).toString() }; // Example params
      const qs = new URLSearchParams(params).toString();
  
      // get() renvoie { data, status, ... }
      const [costsRes, usageRes] = await Promise.all([
        get(`/translate-plugin/openai/costs?${qs}`),
        get(`/translate-plugin/openai/completions?${qs}`)
      ]);
  
      setCosts(costsRes.data);
      setUsage(usageRes.data);
    } catch (e) {
      notify({ type: 'warning', message: 'Cannot load OpenAI stats' });
    }
    setLoad(false);
  };
  

  useEffect(() => {
    load();
  }, []);

  const totalCost = costs?.data.reduce((s,b)=>s + (b.results[0].amount.value||0),0).toFixed(4) ?? '–';
  const totalTok  = usage?.data.reduce((s,b)=>
        s + (b.results[0].input_tokens||0)+(b.results[0].output_tokens||0)
       ,0).toLocaleString() ?? '–';

  return (
    <Box padding={8} background="neutral100">
      <Typography variant="alpha">OpenAI usage dashboard</Typography>

      <Box paddingTop={4} paddingBottom={4}>
        <DatePicker
          label="From"
          selectedDate={from}
          onChange={(d)=>setFrom(d)}
        />
        <DatePicker
          label="To"
          selectedDate={to}
          onChange={(d)=>setTo(d)}
        />
        <Button startIcon={<Calendar/>} loading={loading} onClick={load}>
          Refresh
        </Button>
      </Box>

      <Grid gap={4}>
        <Card id="total-cost-card"><CardBody>
          <Typography fontWeight="bold">Total cost ($)</Typography>
          <Typography variant="epsilon">{totalCost}</Typography>
        </CardBody></Card>

        <Card id="total-tokens-card"><CardBody>
          <Typography fontWeight="bold">Total tokens</Typography>
          <Typography variant="epsilon">{totalTok}</Typography>
        </CardBody></Card>

        <Card id="requests-card"><CardBody>
          <Typography fontWeight="bold">Requests</Typography>
          <Typography variant="epsilon">
            {usage?.data.reduce((s,b)=>s+(b.results[0].num_model_requests||0),0)
              .toLocaleString() ?? '–'}
          </Typography>
        </CardBody></Card>
      </Grid>
    </Box>
  );
};

export default HomePage;
