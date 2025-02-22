import { useState } from 'react';

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
import { GridContainer } from '@styled/layout.style';

const ProjectList = ({ projects }) => {

    return (
        <PageContainer className="c-page">
            <GridContainer cols="20rem 1fr">
                <nav className="c-site-nav">
                    <a href="/" className="c-site-logo" alt="home">
                        <img style={ { width: 84, height: 68 } } src="/logo.svg" />
                    </a>
                    <h1>Projects</h1>
                    <ul className="l-plain nav-list">
                    { projects && projects.map((p, idx) => {
                    
                        const path = `/project/${ p.iri.substring(p.iri.lastIndexOf('/') + 1, p.iri.indexOf('.ttl')) }`;
                        return <li key={ idx } className="nav-list__item"><a href={ path }>{ p.projectName.value }</a></li>;
                    }) }
                    </ul>
                </nav>
            </GridContainer>
        </PageContainer>
    );
};

export default ProjectList;

// export const getStaticPaths = async () => {
//     // Call an external API endpoint to get posts
//     const list = await fetchDocument('https://michaud.inrupt.net/public/portfolio/projects.ttl')
//     const refs = list.findSubjects(portfolio.classes.Project).map(p => {
//         const ref = p.getRef()
//         return ref.substring(ref.lastIndexOf('/'), ref.indexOf('.ttl'));
//     });
//     // Get the paths we want to pre-render based on posts
//     const paths = refs.map(ref => `/portfolio/${ ref }`)

//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
// };

export const getStaticProps = async ctx => {

    const list = await fetchDocument('https://michaud.inrupt.net/public/portfolio/projects.ttl')
    const refs = list.findSubjects(portfolio.classes.Project).map(p => p.getRef());

    const promises = refs.map(ref => fetchResource(ref));
    const docs = await Promise.all(promises);
    const shape = typeShape[portfolio.classes.Project];

    const items = docs.map(doc => {

        const itemRef = doc.findSubject(rdf.type, namedNode(portfolio.classes.Project));

        const item = parseFields(shape, doc)(itemRef);

        return ({
            ...item
        })
    });

    return { props: { projects: items } };
};
