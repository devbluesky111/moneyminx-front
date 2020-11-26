import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceArea } from 'recharts';

import CircularSpinner from 'common/components/spinner/circular-spinner';
import { AccountBarGraphProps } from 'account/account.type';
import { fNumber, numberWithCommas } from 'common/number.helper';

const CustomTooltip = (props: any) => {
  const { active, payload } = props;
  if (active) {
    return (
      <div className='bar-tooltip'>
        <div className='item-name'>
          {payload[0].payload.interval}
        </div>
        <div className='item-value'>
          {`$${numberWithCommas(fNumber(payload[0].payload.value, 0))}`}
        </div>
      </div>
    )
  }
  return null;
};

const renderCustomRALabel = (props: any) => {
  const { x, y } = props.viewBox;
  return <text style={{
    fontFamily: 'Mulish',
    lineHeight: '150%',
    fontSize: '11px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    letterSpacing: '0.2em',
    textTransform: 'uppercase'
  }} x={x + 15} y={y + 25} fill='#534CEA' fillOpacity='0.4'>projected</text>;
};

const formatter = (value: number) => {
  if (value < 1000000) {
    return `$${value / 1000}k`;
  } else {
    return `$${value / 1000000}m`;
  }
}

const getInterval = (max: number) => {
  let _interval = max / 4;
  let _l = Number(_interval.toString().split('.')[0].length) - 1;
  let _maxFloor = Math.ceil(_interval / (Math.pow(10, _l)));
  return _maxFloor * Math.pow(10, _l);
}

const AccountBarGraph: React.FC<AccountBarGraphProps> = (props) => {
  const account = props.account;
  if (!account?.length) {
    return <CircularSpinner />;
  }
  let max = 0;
  for (let i = 0; i < account.length; i++) {
    if (account[i].value > max) {
      max = account[i].value;
    }
  }
  let first_projection = undefined;
  for (let i = 0; i < account.length; i++) {
    if (account[i].type === 'projection') {
      first_projection = account[i].interval;
      break;
    }
  }
  let _interval = getInterval(max);
  if (max > _interval * 3.5) {
    _interval = getInterval(max + _interval / 2);
  }

  return (
    <div className='account-responsive-container'>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          width={800}
          height={354}
          data={account}
          barGap={2}
          barCategoryGap={20}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.5} />
              <stop offset='95%' stopColor='#FFFFFF' stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id='colorPr' x1='0' y1='1' x2='1' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.3} />
              <stop offset='95%' stopColor='#FFFFFF' stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke='#969eac1a' vertical={false} />
          <XAxis dataKey='interval' tickSize={0} tickMargin={10} tick={{ fontSize: 14 }} stroke='#969eac' axisLine={{ stroke: 'transparent' }} />
          <YAxis
            orientation='right'
            minTickGap={10}
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            tick={{ fontSize: 14 }}
            interval="preserveStartEnd"
            stroke='#969eac'
            tickFormatter={(tick) => formatter(tick)}
            domain={[0, _interval * 4]}
          />
          <ReferenceArea
            x1={first_projection}
            y1={0}
            label={renderCustomRALabel}
            fill='url(#colorPr)'
          />
          <Tooltip
            separator=''
            cursor={false}
            content={<CustomTooltip />}
          />
          <Bar dataKey='value' barSize={10} fill='#235EE7' radius={[2, 2, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccountBarGraph;