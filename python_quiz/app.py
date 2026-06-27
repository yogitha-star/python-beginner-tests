#!/usr/bin/env python3
"""
Simple CLI multiple-choice quiz for Python beginners.
Usage: python3 -m python_quiz.app
"""
import json
import os
import sys
from typing import List, Dict, Any, Optional

CHOICE_LETTERS = ["A", "B", "C", "D", "E", "F"]


def load_questions() -> List[Dict[str, Any]]:
    path = os.path.join(os.path.dirname(__file__), "questions.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
            questions = data.get("questions") if isinstance(data, dict) else data
            if not isinstance(questions, list):
                print("questions.json has unexpected format (expected list of questions).")
                sys.exit(1)
            validate_questions(questions)
            return questions
    except FileNotFoundError:
        print("questions.json not found. Ensure you run this package from the repo.")
        sys.exit(1)
    except ValueError as e:
        print(f"Invalid questions.json: {e}")
        sys.exit(1)


def validate_questions(questions: List[Dict[str, Any]]) -> None:
    for q in questions:
        if not isinstance(q, dict):
            raise ValueError("Each question must be an object/dictionary")
        if "id" not in q or "question" not in q or "choices" not in q or "answer" not in q:
            raise ValueError(f"Question missing required fields: {q}")
        if not isinstance(q["choices"], list) or len(q["choices"]) == 0:
            raise ValueError(f"Question {q.get('id')} has no choices")
        if not isinstance(q["answer"], int) or not (0 <= q["answer"] < len(q["choices"])):
            raise ValueError(f"Question {q.get('id')} has invalid answer index: {q.get('answer')}")


def format_question(q: Dict[str, Any], index: int) -> str:
    lines = []
    lines.append(f"{index}. {q.get('question')}")
    for i, choice in enumerate(q.get("choices", [])):
        letter = CHOICE_LETTERS[i] if i < len(CHOICE_LETTERS) else str(i + 1)
        lines.append(f"   {letter}. {choice}")
    return "\n".join(lines)


def get_choice_input(num_choices: int) -> Optional[int]:
    valid_letters = CHOICE_LETTERS[:num_choices]
    prompt = f"Enter choice ({'/'.join(valid_letters)}), or number (1-{num_choices}), or 'q' to quit: "
    while True:
        try:
            ans = input(prompt).strip()
        except (KeyboardInterrupt, EOFError):
            # Gracefully handle Ctrl+C / Ctrl+D
            print("\nQuiz aborted by user.")
            return None
        if not ans:
            continue
        if ans.lower() == "q":
            return None
        # Accept letters
        up = ans.upper()
        if up in valid_letters:
            return valid_letters.index(up)
        # Accept numbers 1..n
        if ans.isdigit():
            n = int(ans)
            if 1 <= n <= num_choices:
                return n - 1
        print("Invalid choice. Try again.")


def main() -> None:
    questions = load_questions()
    if not questions:
        print("No questions found.")
        return

    print("\nWelcome to the Python Beginner Quiz!\n")
    correct = 0
    asked = 0
    incorrect_list = []

    for idx, q in enumerate(questions, start=1):
        print(format_question(q, idx))
        choice = get_choice_input(len(q.get("choices", [])))
        if choice is None:
            # User chose to quit or aborted
            break
        asked += 1
        try:
            correct_index = int(q.get("answer"))
        except (TypeError, ValueError):
            print("Question has an invalid answer configured. Skipping.")
            continue
        if choice == correct_index:
            print("Correct!\n")
            correct += 1
        else:
            corr_letter = CHOICE_LETTERS[correct_index] if correct_index < len(CHOICE_LETTERS) else str(correct_index + 1)
            print(f"Incorrect. Correct answer: {corr_letter}\n")
            incorrect_list.append({
                "question": q.get("question"),
                "your": choice,
                "correct": correct_index,
                "explanation": q.get("explanation"),
            })

    # Summary
    print("\n--- Quiz Summary ---")
    print(f"Questions answered: {asked}")
    print(f"Score: {correct} / {asked}")
    if asked:
        pct = (correct / asked) * 100
        print(f"Percentage: {pct:.1f}%")

    if incorrect_list:
        print("\nReview of incorrect answers:")
        for item in incorrect_list:
            your = CHOICE_LETTERS[item['your']] if isinstance(item['your'], int) and item['your'] < len(CHOICE_LETTERS) else item['your']
            corr = CHOICE_LETTERS[item['correct']] if isinstance(item['correct'], int) and item['correct'] < len(CHOICE_LETTERS) else item['correct']
            print(f"\nQuestion: {item['question']}")
            print(f"Your answer: {your}")
            print(f"Correct answer: {corr}")
            if item.get('explanation'):
                print(f"Explanation: {item.get('explanation')}")

    print("\nThank you for taking the quiz!\n")


if __name__ == "__main__":
    main()
