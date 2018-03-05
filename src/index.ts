const world = '🗺️';

export function hello(word:  string = world): string {
  return `Hello ${world}! `;
}

console.log(hello());

function tokenize(input: string): string[] {
  return input.split(/\s+/);
}

enum Operator { Addition, Subtraction }
type Expression = Number | { operator: Operator, lhs: Expression, rhs: Expression };

interface ParseResult { rest: string[]; expression: Expression; }

function parse(tokens: string[]): ParseResult {
  const topToken = tokens[0];
  if (topToken === '+') {
    const lhs = parse(tokens.slice(1));
    const rhs = parse(lhs.rest);
    const res = { operator: Operator.Addition, lhs: lhs.expression, rhs: rhs.expression };
    return { rest: rhs.rest, expression: res };
  }

  // number
  return { rest: tokens.slice(1), expression: parseInt(tokens[0], 10) };
}

const form = document.querySelector('.input-form');
const inputEl = <HTMLInputElement> document.querySelector('.input');
// inputEl.focus();

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = inputEl.value;
    console.log(text);
    inputEl.value = '';

    const tokens = tokenize(text);
    const ast = parse(tokens);
    console.log(ast);
  });
}
