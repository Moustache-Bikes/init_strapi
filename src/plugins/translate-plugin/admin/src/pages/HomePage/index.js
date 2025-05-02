import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  Card,
  CardBody,
  Typography,
  DatePicker,
  Button,
} from '@strapi/design-system';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';
import { Calendar, Store, List, OneToMany } from '@strapi/icons';

const MS  = 1_000;
const DAY = 24 * 3600;
const toSec = (d) => Math.floor(d.getTime() / MS);
const sum = (b, pick) => (b || []).reduce((t, bucket) =>
  t + pick(bucket.results?.[0] || {}), 0);

export default function HomePage() {
  const { get } = useFetchClient();
  const notify  = useNotification();

  const today   = new Date();
  const weekAgo = new Date(Date.now() - DAY * MS * 7);

  const [from, setFrom]   = useState(weekAgo);
  const [to,   setTo]     = useState(today);
  const [busy, setBusy]   = useState(false);
  const [costPage,  setCost]  = useState(null);
  const [usagePage, setUsage] = useState(null);

  const fetchStats = async () => {
    setBusy(true);
    try {
      const qs = new URLSearchParams({
        from: toSec(from).toString(),
        to  : toSec(to).toString(),
      }).toString();

      const [{ data: costs }, { data: usage }] = await Promise.all([
        get(`/translate-plugin/openai/costs?${qs}`),
        get(`/translate-plugin/openai/completions?${qs}`),
      ]);

      setCost(costs);
      setUsage(usage);
    } catch {
      notify({ type:'warning', message:'Cannot load OpenAI stats' });
    }
    setBusy(false);
  };

  useEffect(() => { fetchStats(); }, []);

  const totalCost = costPage
    ? sum(costPage.data, (r)=>r.amount?.value ?? 0).toFixed(4) : '–';

  const totalTok  = usagePage
    ? sum(usagePage.data, (r)=>(r.input_tokens||0)+(r.output_tokens||0))
      .toLocaleString() : '–';

  const totalReq  = usagePage
    ? sum(usagePage.data, (r)=>r.num_model_requests||0)
      .toLocaleString() : '–';

  return (
    <Box padding={8} background="neutral100">
      <Typography variant="alpha" fontWeight="bold">
        OpenAI usage dashboard
      </Typography>

      {/* plage de dates */}
      <Flex
        marginTop={4}
        marginBottom={6}
        padding={4}
        background="neutral0"
        shadow="tableShadow"
        hasRadius
        gap={4}
        alignItems="flex-end"
        wrap="wrap"
      >
        <DatePicker label="From" selectedDate={from} onChange={setFrom}/>
        <DatePicker label="To"   selectedDate={to}   onChange={setTo}/>
        <Button
          variant="secondary"
          startIcon={<Calendar/>}
          loading={busy}
          onClick={fetchStats}
        >
          Refresh
        </Button>
      </Flex>

      {/* KPI en trois colonnes fixes (≥ 260 px) */}
      <Grid gap={4} gridTemplateColumns="repeat(auto-fit,minmax(260px,1fr))">
        {/* coût */}
        <Card id="total-cost-card" shadow="tableShadow" background="neutral0">
          <CardBody>
            <Flex gap={3} alignItems="center">
              <Store width={24} height={24}/>
              <Typography fontWeight="bold">Total cost</Typography>
              <Typography variant="beta" marginLeft="auto">
                ${totalCost}
              </Typography>
            </Flex>
          </CardBody>
        </Card>

        {/* tokens */}
        <Card id="total-tokens-card" shadow="tableShadow" background="neutral0">
          <CardBody>
            <Flex gap={3} alignItems="center">
              <List width={24} height={24}/>
              <Typography fontWeight="bold">Total tokens</Typography>
              <Typography variant="beta" marginLeft="auto">
                {totalTok}
              </Typography>
            </Flex>
          </CardBody>
        </Card>

        {/* requêtes */}
        <Card id="requests-card" shadow="tableShadow" background="neutral0">
          <CardBody>
            <Flex gap={3} alignItems="center">
              <OneToMany width={24} height={24}/>
              <Typography fontWeight="bold">Requests</Typography>
              <Typography variant="beta" marginLeft="auto">
                {totalReq}
              </Typography>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
}
