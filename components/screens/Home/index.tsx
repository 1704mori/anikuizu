/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { APIResponse } from "../../../interfaces";
import en from "../../../locales/en";
import ja from "../../../locales/ja";
import Button from "../../Button";
import Check from "../../Icons/Check";
import Close from "../../Icons/Close";
import { QuizContainer } from "./styles";
import { GlobalContext } from "../../../contexts/GlobalContext";
import data from '../../../public/results.json';

export default function Home() {
  const [quiz, setQuiz] = useState<{
    anime: {
      image: string;
      title: string;
      score: number;
    };
    question: {
      image: string;
      title: string;
      score: number;
    };
  }>();
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [question, setQuestion] = useState<APIResponse>();

  const { keepPreviousQuestion, setKeepPreviousQuestion } =
    useContext(GlobalContext);

  const { locale } = useRouter();
  const t = locale === "en" ? en : ja;

  useEffect(() => {
    (async () => {
      setKeepPreviousQuestion(
        localStorage.getItem("keepPreviousQuestion") === "true" ? true : false
      );
      setHighScore(parseInt(localStorage.getItem("baka") || "0"));
      classicQuiz();
    })();
  }, []);

  
  function generateRandomQuiz(data: APIResponse[]) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomAnime = data[randomIndex];
    const randomQuestion = data[Math.floor(Math.random() * data.length)];

    setQuestion(randomQuestion);

    if (randomAnime.mal_id === randomQuestion.mal_id) {
      generateRandomQuiz(data);
      return;
    }

    let quiz = {
      anime: {
        image: randomAnime.large_image_url,
        title: randomAnime.title,
        score: randomAnime.score,
      },
      question: {
        image: randomQuestion.large_image_url,
        title: randomQuestion.title,
        score: randomQuestion.score,
      },
    };

    if (keepPreviousQuestion) {
      quiz = {
        anime: {
          image: question?.large_image_url as string,
          title: question?.title as string,
          score: question?.score as number,
        },
        question: {
          image: randomQuestion.large_image_url,
          title: randomQuestion.title,
          score: randomQuestion.score,
        },
      };
    }

    setQuiz(quiz);
  }

  function classicQuiz() {
    generateRandomQuiz(data);
  }

  function updateHighScore() {
    setHighScore(score);
    window.localStorage.setItem("baka", score.toString());
  }

  function updateScore() {
    setScore(score + 1);
  }

  function updateQuiz(lost: boolean) {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      setLost(lost);
      newQuiz();

      if (lost) {
        if (score > highScore) {
          updateHighScore();
        }
        setScore(0);
      }

      if (!lost) {
        updateScore();
        setWon(true);
        newQuiz();
      }
    }, parseInt(window.localStorage.getItem("animationSpeed") as string) || 600);
  }

  function newQuiz() {
    setTimeout(() => {
      setLost(false);
      setWon(false);
      classicQuiz();
    }, 2000);
  }

  function higherScore() {
    if (!quiz || won || lost) return;

    if (quiz.question.score >= quiz.anime.score) {
      updateQuiz(false);
    } else {
      updateQuiz(true);
    }
  }

  function lowerScore() {
    if (!quiz || won || lost) return;

    if (quiz.question.score <= quiz.anime.score) {
      updateQuiz(false);
    } else {
      updateQuiz(true);
    }
  }

  // if (!home.quizType) {
  //   return (
  //     <div className="flex flex-col h-full justify-center items-center">
  //       <h1 className="text-4xl font-bold">Welcome to the Quiz App</h1>
  //       <Button className="!text-xl" onClick={classicQuiz}>
  //         Classic
  //       </Button>
  //     </div>
  //   );
  // }

  if (typeof window === "undefined") return null;

  const overlayOpacity = window.localStorage.getItem("overlayOpacity") || "80";

  return (
    <QuizContainer
      className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative"
      opacity={overlayOpacity}
    >
      <Head>
        <title>AniKuizu</title>
        <meta name="description" content="Test your anime knowledge!" />
        <meta property="og:title" content="AniKuizu" />
        <meta property="og:description" content="Test your anime knowledge!" />
      </Head>

      <div
        className="ani flex flex-col relative w-full bg-cover overflow-hidden h-full"
        style={{
          backgroundImage: `url(${quiz?.anime?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          imageRendering: "pixelated",
        }}
      >
        <div
          className="
          flex flex-col
          justify-center
          items-center
          absolute
          w-full
          h-full
          gap-1
        "
        >
          <div className="text-2xl text-white max-w-xl text-center">
            {quiz?.anime.title}
          </div>
          <div className="text-base text-white">{t.aniScore}</div>
          <div className="text-2xl font-bold text-white">
            {quiz?.anime.score}
          </div>
        </div>
      </div>
      <div className={`bg-white rounded-full vs `}>
        <div
          className={classNames({
            rumble: loading,
          })}
        >
          {!won && !lost && "VS"}
          {!loading && !lost && won && <Check />}
          {!loading && !won && lost && <Close />}
        </div>
      </div>
      <div
        className="ani flex flex-col relative w-full bg-cover overflow-hidden h-full"
        style={{
          backgroundImage: `url(${quiz?.question?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          imageRendering: "pixelated",
        }}
      >
        <div
          className="
          flex flex-col
          justify-center
          items-center
          absolute
          w-full
          h-full
          gap-1
        "
        >
          <div className="text-2xl text-white max-w-xl text-center">
            {quiz?.question.title}
          </div>
          <div className="text-base text-white">{t.aniScore}</div>
          {!won && !lost ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={higherScore}>{t.higher}</Button>
                <Button onClick={lowerScore}>{t.lower}</Button>
              </div>
              {locale === "en" && (
                <div className="text-base text-white max-w-sm text-center mt-3">
                  {t.than}
                </div>
              )}
            </>
          ) : (
            <div className="text-2xl font-bold text-white">
              {quiz?.question.score}
            </div>
          )}

          {!won && !lost && (
            <div className="text-base text-white max-w-sm text-center">
              {quiz?.anime.title}
              {locale === "jp" && t.than}
            </div>
          )}
        </div>
      </div>
      <div className="z-20 fixed bottom-3 left-3 text-white text-xl">
        <div className="font-medium">
          {t.highScore}: {highScore}
        </div>
        <div className="font-medium">
          {t.score}: {score}
        </div>
      </div>
    </QuizContainer>
  );
}
