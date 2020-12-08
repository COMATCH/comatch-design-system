import React, { memo, useEffect, useState } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

import { buildComponentIdAndClassNameFromProps, noop } from '../../core';

import { ComponentProps, QuestionnaireAnswer } from './types';
import { Answer, Wrapper } from './styled';

function QuestionnaireOption(props: ComponentProps) {
    const {
        answers,
        divider,
        generateCss,
        name,
        onChange = noop,
        pinnedToSelectedAnswer,
        selectedAnswer,
        ...rest
    } = props;

    const [currentAnswer, setCurrentAnswer] = useState(selectedAnswer);
    const [defaultAnswer, setDefaultAnswer] = useState(selectedAnswer);

    const buildAnswerSelectionHandler = (answer: QuestionnaireAnswer) => () => {
        if (!pinnedToSelectedAnswer) {
            setCurrentAnswer(currentAnswer !== answer.id ? answer.id : undefined);
        }
    };

    useEffect(() => {
        if (defaultAnswer !== selectedAnswer && currentAnswer !== selectedAnswer) {
            setCurrentAnswer(selectedAnswer);
        }

        setDefaultAnswer(selectedAnswer);
    }, [selectedAnswer]);

    useEffect(() => {
        onChange(answers.find(({ id }) => id === currentAnswer));
    }, [currentAnswer]);

    return (
        <Wrapper
            {...buildComponentIdAndClassNameFromProps(rest, 'QuestionnaireOption', { selected: !!currentAnswer })}
            generateCss={generateCss}
        >
            {answers.map((answer) => {
                const { id, title, description, value } = answer;
                const selected = id === currentAnswer;
                const leftOut = !!currentAnswer && id !== currentAnswer;
                const onClick = buildAnswerSelectionHandler(answer);

                return (
                    <Answer key={id} className={classnames({ selected, 'left-out': leftOut })} onClick={onClick}>
                        <div className="Title">
                            {title}
                            {selected && <FontAwesomeIcon icon={faCheck} />}
                        </div>
                        <div className="Description">{description}</div>
                        {name && <input type="radio" id={id} name={name} value={value || id} checked={selected} />}
                    </Answer>
                );
            })}

            <div className="DividerLine" />
            {divider && <div className="Divider">{divider}</div>}
        </Wrapper>
    );
}

export { Wrapper as StyledQuestionnaireOption };
export default memo(QuestionnaireOption);
