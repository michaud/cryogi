import React, { useState } from 'react';

import { useAuth } from '@contexts/AuthProvider';

import Authentication from '@components/Authentication';
import { solid, rdf } from 'rdf-namespaces';

import { namedNode } from '@rdfjs/data-model';

import { PageContainer } from '@styled/page.style';
import { fetchDocument } from 'tripledoc';
import portfolio from '@constants/portfolio-namespace';
import fetchResource from '@services/fetchResource';
import typeShape from '@utils/parseData/typeShape';
import parseFields from '@utils/parseData/parseFields';
const PortfolioList = ({ portfolios }) => {

    return (
        <PageContainer>
            <Authentication />
            <h1>Portfolio list</h1>
            {/* { webId && `webid:${ webId }` } */ }
            <ul>
            { portfolios && portfolios.map(p => <li>{ p.portfolioName.value }</li>) }
            </ul>
        </PageContainer>
    );
};

export default PortfolioList;

// export const getStaticPaths = async () => {
//     // Call an external API endpoint to get posts
//     const portfolioList = await fetchDocument('https://michaud.inrupt.net/public/portfolio/portfolios.ttl')
//     const portfolios = portfolioList.findSubjects(portfolio.classes.Portfolio).map(p => p.asNodeRef());

//     // Get the paths we want to pre-render based on posts
//     const portfolioPaths = portfolios.map(portfolio => `/posts/${ portfolio }`)

//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
// };

export const getStaticProps = async ctx => {

    const portfolioList = await fetchDocument('https://michaud.inrupt.net/public/portfolio/portfolios.ttl')
    const portfoliosRefs = portfolioList.findSubjects(portfolio.classes.Portfolio).map(p => p.getRef());

    const portfolioPromises = portfoliosRefs.map(portfolioRef => fetchResource(portfolioRef));
    const docs = await Promise.all(portfolioPromises);
    const shape = typeShape[portfolio.classes.Portfolio];

    const items = docs.map(doc => {

        const itemRef = doc.findSubject(rdf.type, namedNode(portfolio.classes.Portfolio));

        const item = parseFields(shape, doc)(itemRef);

        return ({
            ...item
        })
    });

    return { props: { portfolios: items } };
};
