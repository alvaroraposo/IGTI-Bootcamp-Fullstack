import React from 'react';
import Stars from './Stars';
import Name from './Name';
import CountUp from 'react-countup';

import { formatNumber, formatPercentage } from '../helpers/format';

/**
 * Este componente é um pouco mais complexo porque
 * abriga quatro tipos de dados:
 *
 * 1) Nome do candidato
 * 2) Votação
 * 3) Percentual de votação
 * 4) Índice de popularidade
 *
 * Para isso, o componente retorna uma lista
 * não-ordenada (<ul><li>) com 4 componentes
 * menores para exibir os dados
 */
export default function Statistics({ candidate }) {
  const { name, votes, percentage, previousVotes, popularity } = candidate;

  return (
    <ul>
      <li>
        <Name>{name}</Name>
      </li>
      <li>
        <CountUp
          start={previousVotes}
          end={votes}
          duration={0.2}
          separator="."
        >
          <span>{votes}</span>
        </CountUp>
      </li>
      <li>{formatPercentage(percentage)}</li>
      <li>
        <Stars level={popularity} max={10} />
      </li>
    </ul>
  );
}
