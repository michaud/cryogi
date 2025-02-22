import { useState } from 'react';

import { PageContainer } from '@styled/page.style';
import { fetchDocument } from 'tripledoc';
import portfolio from '@constants/portfolio-namespace';
import fetchResource from '@services/fetchResource';
import typeShape from '@utils/parseData/typeShape';
import parseFields from '@utils/parseData/parseFields';
import { GridContainer } from '@styled/layout.style';
import HeaderBackground from '@components/header/HeaderBackground';

const ProjectDetail = ({ project }) => {

    const {
        projectName,
        periods,
        clientName,
        industry,
        description,
        mission,
        result,
        roles,
        responsibilities,
        tools,
        technologies,
        agency,
        screenshots
    } = project;

    return (
        <>
            <div style={ {
                background: 'linear-gradient(rgb(199, 178, 143) 0px, rgb(195, 184, 165) 375px)',
                minHeight: '100rem',
                position: 'relative'
            } }>
                <HeaderBackground/>
                <PageContainer className="c-page--project">
                    <a href="/" className="c-site-logo" alt="home">
                        <img className="c-site-logo__img" src="/logo.svg" />
                    </a>

                    <div  style={{ background: 'rgba(218, 207, 180, 0.85)', padding: '3rem', margin: '0 12.2rem 0 12.2rem', maxWidth: '72.8rem'}}>
                        <h1 className="h-project"><span className="h-project__tag">{ projectName.value }</span></h1>
                        <div> <span className="pill pill--accent pill--accent-weight">for { clientName.value }</span> <span className="pill pill--accent">in { industry.value }</span> <span className="pill pill--accent">by { agency.value }</span></div>
                        <GridContainer cols="5fr 1fr" gap="2rem">
                            <div>
                                <div className="">
                                    <h3>Mission</h3>{ mission.value }
                                </div>
                                <div className="">
                                    <h3>Description</h3>
                                    { description.value }
                                </div>
                                <div className="">
                                    <h3>Result</h3>
                                    { result.value }
                                </div>
                            </div>
                            <div className="tbl--top tbl--pill">
                                <h2>involvement</h2>
                                <GridContainer cols="1fr 1fr" gap=".5rem" style={ { width: '24rem' } }>
                                    <div><h3>roles</h3>{ roles.value.map((role, idx) => <span className="pill pill--accent" key={ `role${idx}` }>{ role }</span>) }</div>
                                    <div><h3>responsibilities</h3>{ responsibilities.value.map((resp, idx) => <span className="pill pill--accent" key={ `resp${idx}` }>{ resp }</span>) }</div>
                                    <div><h3>tools</h3>{ tools.value.map((tool, idx) => <span className="pill pill--accent" key={ `tool${idx}` }>{ tool }</span>) }</div>
                                    <div><h3>technologies</h3>{ technologies.value.map((technology, idx) => <span className="pill pill--accent" key={ `technology${idx}` }>{ technology }</span>) }</div>
                                </GridContainer>
                                <div>{ screenshots.value.map((shot, idx) => <img style={{ width: '100%'}} key={ `img${idx}` } src={ shot.screenshotUrl.value } />) }</div>
                            </div>
                        </GridContainer>
                    </div>
                </PageContainer>

            </div>
            <div style={ { backgroundColor: '#eceadc', position: 'relative' } }>
                <svg
                    style={ { position: 'absolute', top: 0, left: 0, zIndex: 0 } }
                    width="2920" height="610"
                    version="1.1"
                    viewBox="0 0 2920 610"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="clipPath972-5">
                            <path d="M 0 0 l 0 323.9 l 46.7 -60.8 h 2873.2 v -263.1 z" />
                        </clipPath>
                    </defs>
                    {/* <image x="0" y="-270" width="3724" height="835" clipPath="url(#clipPath972-5)" href="/header-bg.jpg" /> */}
                    <path d="M 0 0 l 0 38.2 l 46.7 60.8 h 2873.2 v -99 z" fill="#100f56" />
                </svg>
                <img style={ { position: 'absolute', top: 40, left: 71, width: 110 } } src="/logo.svg" />
                <PageContainer style={ { position: 'relative', width: '75vw', margin: '0 auto', marginTop: '12rem' } }>
                    <h1 className="h-project"><span className="h-project__tag">{ projectName.value }</span> <span className="pill pill--accent pill--accent-weight">for { clientName.value }</span> <span className="pill pill--accent">in { industry.value }</span> <span className="pill pill--accent">by { agency.value }</span></h1>
                    <GridContainer cols="1fr 1fr" gap=".5rem">
                        <div className="tbl--top tbl--pill">
                            <h2>involvement</h2>
                            <GridContainer cols="1fr 1fr" gap=".5rem" style={ { width: '24rem' } }>
                                <div><h3>roles</h3>{ roles.value.map((role, idx) => <span className="pill pill--accent" key={ `role${idx}` }>{ role }</span>) }</div>
                                <div><h3>responsibilities</h3>{ responsibilities.value.map((resp, idx) => <span className="pill pill--accent" key={ `resp${idx}` }>{ resp }</span>) }</div>
                                <div><h3>tools</h3>{ tools.value.map((tool, idx) => <span className="pill pill--accent" key={ `tool${idx}` }>{ tool }</span>) }</div>
                                <div><h3>technologies</h3>{ technologies.value.map((technology, idx) => <span className="pill pill--accent" key={ `technology${idx}` }>{ technology }</span>) }</div>
                            </GridContainer>
                        </div>
                        <div className="">{ description.value }</div>
                        <div className="">{ mission.value }</div>
                        <div className="">{ result.value }</div>
                    </GridContainer>
                    <div>{ screenshots.value.map((shot, idx) => <img key={ `img${idx}` } src={ shot.screenshotUrl.value } />) }</div>
                </PageContainer>
            </div>
        </>
    );
};

export default ProjectDetail;

export const getStaticPaths = async () => {

    // Call an external API endpoint to get posts
    const list = await fetchDocument('https://michaud.inrupt.net/public/portfolio/projects.ttl')

    const projectRefs = list.findSubjects(portfolio.classes.Project).map(p => p.getRef());

    // Get the paths we want to pre-render based on posts
    const paths = projectRefs.map(projectRef => {

        return `/project/${projectRef.substring(projectRef.lastIndexOf('/') + 1, projectRef.indexOf('.ttl'))}`;
    })

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
};

export const getStaticProps = async ctx => {

    const id = ctx.params.id;

    const list = await fetchDocument('https://michaud.inrupt.net/public/portfolio/projects.ttl')
    const projectRef = list.findSubjects(portfolio.classes.Project).filter(p => {
        return p.getRef().indexOf(id) > -1;
    });

    const doc = await fetchResource(projectRef[0].getRef());
    const project = doc.getSubjectsOfType(portfolio.classes.Project);
    const shape = typeShape[portfolio.classes.Project];
    const item = parseFields(shape, doc)(project[0]);

    return { props: { project: item } };
};
