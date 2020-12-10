/* eslint-disable radix */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { theme } from '../..';
import { PageWrapper, Table, TableRow } from './styled';
import FontHeadline from './FontHeadline';

const { typography } = theme;

export default { title: 'Style Guide/Typography' };

export const Roboto = () => (
    <PageWrapper>
        <h1>
            <FontHeadline />
            <FontHeadline bold />
        </h1>
        <p>
            <div>a b c d e f g h i j k l m n o p q r s t u v w x y z</div>
            <div>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
            <div>0 1 2 3 4 5 6 7 8 9 . : ! - –</div>
        </p>

        <h1>Type scale</h1>
        <p className="note">
            The COMATCH type scale includes a range of contrasting styles that support the needs of our product and its
            content.
        </p>
        <p className="note">
            The type scale is a combination of 6 styles that are supported by the type system. It contains reusable
            categories of text, each with an intended application and meaning.
        </p>
        <Table>
            <thead>
                <tr>
                    <th />
                    <th>FONT SIZE</th>
                    <th>LINE HEIGHT</th>
                    <th>FONT WEIGHT</th>
                    <th>Example</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(typography).map((key) => {
                    const typographyEntry = key as keyof typeof typography;
                    const { fontSize, lineHeight } = typography[typographyEntry];

                    return (
                        <TableRow key={key} typographyEntry={typographyEntry}>
                            <td>{key}</td>
                            <td>{fontSize}</td>
                            <td>
                                {lineHeight} ({parseInt(fontSize) * lineHeight}px)
                            </td>
                            <td>
                                <span>Regular</span>,<span>Bold</span>
                            </td>
                            <td>
                                <span>Lorem ipsum dolor</span>,<span>Lorem ipsum dolor</span>
                            </td>
                        </TableRow>
                    );
                })}
            </tbody>
        </Table>

        <h4>Unordered List</h4>
        <ul className="TextList">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>

        <h4>Ordered List</h4>
        <ol className="TextList">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ol>
    </PageWrapper>
);
