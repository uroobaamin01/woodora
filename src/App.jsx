import { useEffect, useState } from 'react';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { Navbar, Footer, Img, State } from './components/ui.jsx';
import * as S from './components/sections.jsx';
import useFetch, { useLocalStorage } from './hooks/useFetch.js';
import { getProjectById, getPostById } from './services/api.js';

const Home = () => (
  <>
    <S.Hero />
    <S.Intro />
    <S.Services />
    <S.Portfolio />
    <S.Process />
    <S.Gallery />
    <S.Products />
    <S.Testimonials />
    <S.Journal />
    <S.Why />
    <S.CTA />
    <S.Contact />
    <S.FAQ />
  </>
);

const Detail = ({ fetcher, kind }) => {
  const { id } = useParams();

  const { data, loading, error, retry } = useFetch(fetcher, id);

  const [, setRecent] = useLocalStorage('lumiere-recent', []);

  useEffect(() => {
    if (kind === 'project' && data) {
      setRecent((r) =>
        [data.id, ...r.filter((x) => x !== data.id)].slice(0, 5)
      );
    }
  }, [data, kind]);

  return (
    <main className="detail">
      <State loading={loading} error={error} retry={retry}>
        {data && (
          <article>
            <Link
              className="link"
              to={kind === 'project' ? '/#portfolio' : '/journal'}
            >
              ← Back
            </Link>

            <h1>{data.name || data.title}</h1>

            <p className="meta">
              {data.location
                ? `${data.location}, ${data.year}. ${data.category}`
                : data.category}
            </p>

            <Img
              src={data.image}
              alt={data.name || data.title}
            />

            {data.body ? (
              data.body.map((t, i) => (
                <p key={i}>{t}</p>
              ))
            ) : (
              <p>{data.description}</p>
            )}
          </article>
        )}
      </State>
    </main>
  );
};

export default function App() {
  const { pathname, hash } = useLocation();

  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const f = () => setSolid(scrollY > 60);

    f();

    addEventListener('scroll', f);

    return () => removeEventListener('scroll', f);
  }, []);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document
          .querySelector(hash)
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      <Navbar solid={solid || pathname !== '/'} />

      <div className="page" key={pathname}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/projects/:id"
            element={
              <Detail
                fetcher={getProjectById}
                kind="project"
              />
            }
          />

          <Route
            path="/journal"
            element={
              <main className="detail">
                <S.Journal />
              </main>
            }
          />

          <Route
            path="/journal/:id"
            element={
              <Detail
                fetcher={getPostById}
                kind="post"
              />
            }
          />

          <Route
            path="*"
            element={
              <main className="detail">
                <h1>Page not found</h1>

                <Link
                  className="link"
                  to="/"
                >
                  Return home
                </Link>
              </main>
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  );
}