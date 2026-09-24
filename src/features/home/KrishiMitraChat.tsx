"use client";

import { Bot, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import Image from "next/image";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { withBasePath } from "@/config/base-path";
import type { Dictionary, TranslationKey } from "@/i18n/dictionaries";
import styles from "@/styles/application.module.css";
import type { Locale } from "@/types/locale";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const sampleQuestions: Array<{
  questionKey: TranslationKey;
  answerKey: TranslationKey;
}> = [
  {
    questionKey: "chat.question.weather",
    answerKey: "chat.answer.weather",
  },
  {
    questionKey: "chat.question.wheat",
    answerKey: "chat.answer.wheat",
  },
  {
    questionKey: "chat.question.scheme",
    answerKey: "chat.answer.scheme",
  },
  {
    questionKey: "chat.question.mandi",
    answerKey: "chat.answer.mandi",
  },
];

export function KrishiMitraChat({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const nextMessageId = useRef(1);
  const responseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const resetChat = useCallback(() => {
    if (responseTimer.current) {
      clearTimeout(responseTimer.current);
      responseTimer.current = null;
    }
    setIsTyping(false);
    setDraft("");
    setMessages([
      {
        id: nextMessageId.current++,
        role: "assistant",
        text: dictionary["chat.welcome"],
      },
    ]);
  }, [dictionary]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      if (responseTimer.current) {
        clearTimeout(responseTimer.current);
      }
    };
  }, [isOpen, resetChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [isTyping, messages]);

  const askQuestion = (question: string, answer: string) => {
    if (isTyping) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: nextMessageId.current++,
        role: "user",
        text: question,
      },
    ]);
    setDraft("");
    setIsTyping(true);

    responseTimer.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId.current++,
          role: "assistant",
          text: answer,
        },
      ]);
      setIsTyping(false);
      responseTimer.current = null;
    }, 900);
  };

  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question) {
      return;
    }
    askQuestion(question, dictionary["chat.answer.default"]);
  };

  return (
    <>
      <button
        className={styles.floatingAssistant}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => {
          resetChat();
          setIsOpen(true);
        }}
      >
        <span className={styles.floatingAssistantIcon}>
          <Bot size={30} aria-hidden="true" />
        </span>
        <span>{dictionary["common.help"]}</span>
      </button>

      {isOpen ? (
        <div className={styles.chatBackdrop}>
          <section
            className={styles.chatDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="krishi-mitra-title"
            lang={locale === "hi" ? "hi" : "en"}
          >
            <header className={styles.chatHeader}>
              <div className={styles.chatAvatar}>
                <Image
                  src={withBasePath("/images/authenticated/bharati-avatar.jpg")}
                  alt=""
                  width={52}
                  height={52}
                />
                <span aria-hidden="true" />
              </div>
              <div>
                <strong id="krishi-mitra-title">
                  {dictionary["chat.title"]}
                </strong>
                <small>{dictionary["chat.status"]}</small>
              </div>
              <button
                type="button"
                onClick={resetChat}
                aria-label={dictionary["chat.reset"]}
              >
                <RotateCcw size={19} aria-hidden="true" />
              </button>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={dictionary["common.close"]}
              >
                <X size={21} aria-hidden="true" />
              </button>
            </header>

            <div className={styles.chatMessageList} aria-live="polite">
              {messages.map((message) => (
                <div
                  className={
                    message.role === "assistant"
                      ? styles.chatAssistantRow
                      : styles.chatUserRow
                  }
                  key={message.id}
                >
                  {message.role === "assistant" ? (
                    <Image
                      src={withBasePath(
                        "/images/authenticated/bharati-avatar.jpg",
                      )}
                      alt=""
                      width={32}
                      height={32}
                    />
                  ) : null}
                  <p>{message.text}</p>
                </div>
              ))}
              {isTyping ? (
                <div
                  className={styles.chatAssistantRow}
                  role="status"
                  aria-label={dictionary["chat.typing"]}
                >
                  <Image
                    src={withBasePath(
                      "/images/authenticated/bharati-avatar.jpg",
                    )}
                    alt=""
                    width={32}
                    height={32}
                  />
                  <span className={styles.chatTyping} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.chatComposer}>
              <div
                className={styles.chatSuggestions}
                aria-label={dictionary["chat.sampleQuestions"]}
              >
                {sampleQuestions.map(({ questionKey, answerKey }) => (
                  <button
                    type="button"
                    disabled={isTyping}
                    key={questionKey}
                    onClick={() =>
                      askQuestion(
                        dictionary[questionKey],
                        dictionary[answerKey],
                      )
                    }
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    {dictionary[questionKey]}
                  </button>
                ))}
              </div>
              <form className={styles.chatForm} onSubmit={submitQuestion}>
                <MessageCircle size={20} aria-hidden="true" />
                <label className="sr-only" htmlFor="krishi-mitra-question">
                  {dictionary["chat.inputLabel"]}
                </label>
                <input
                  id="krishi-mitra-question"
                  value={draft}
                  disabled={isTyping}
                  placeholder={dictionary["chat.placeholder"]}
                  onChange={(event) => setDraft(event.target.value)}
                />
                <button
                  type="submit"
                  disabled={isTyping || !draft.trim()}
                  aria-label={dictionary["chat.send"]}
                >
                  <Send size={19} aria-hidden="true" />
                </button>
              </form>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
