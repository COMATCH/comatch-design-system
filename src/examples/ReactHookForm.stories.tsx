/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { ErrorMessage } from '@hookform/error-message';

import { PageWrapper } from '../core/storybook';
import {
    Button,
    Currency,
    EMAIL_REGEX,
    PASSWORD_REGEX,
    Paper,
    Select,
    StyledSelect,
    StyledButton,
    StyledTextInput,
    TextInput,
} from '..';

export default {
    title: 'Examples/React Hook Form',
};

export const BasicLogin = () => {
    const { control, errors, handleSubmit, register } = useForm({
        mode: 'all',
        defaultValues: {
            'e-mail': '',
            password: '',
        },
    });
    const onSubmit = console.log;

    const PATTERNS = {
        email: new RegExp(EMAIL_REGEX),
        password: new RegExp(
            [
                PASSWORD_REGEX.START_OF_STRING,
                PASSWORD_REGEX.AT_LEAST_ONE_DIGIT,
                PASSWORD_REGEX.AT_LEAST_ONE_LOWER_CASE,
                PASSWORD_REGEX.AT_LEAST_ONE_UPPER_CASE,
                PASSWORD_REGEX.AT_LEAST_ONE_SPECIAL_CHARACTER,
                PASSWORD_REGEX.NO_WHITE_SPACE,
                PASSWORD_REGEX.AT_LEAST_EIGHT_CHARACTERS,
                PASSWORD_REGEX.END_OF_STRING,
            ].join(''),
        ),
    };

    const passwordValidate = ([
        ['AT_LEAST_ONE_DIGIT', new RegExp(PASSWORD_REGEX.AT_LEAST_ONE_DIGIT), ''],
        ['AT_LEAST_ONE_LOWER_CASE', new RegExp(PASSWORD_REGEX.AT_LEAST_ONE_LOWER_CASE), ''],
        ['AT_LEAST_ONE_UPPER_CASE', new RegExp(PASSWORD_REGEX.AT_LEAST_ONE_UPPER_CASE), ''],
        ['AT_LEAST_ONE_SPECIAL_CHARACTER', new RegExp(PASSWORD_REGEX.AT_LEAST_ONE_SPECIAL_CHARACTER), ''],
        ['NO_WHITE_SPACE', new RegExp(PASSWORD_REGEX.NO_WHITE_SPACE), ''],
        ['AT_LEAST_EIGHT_CHARACTERS', new RegExp(PASSWORD_REGEX.AT_LEAST_EIGHT_CHARACTERS), ''],
    ] as [string, RegExp, string][]).reduce(
        (acc: Record<string, (value: string) => string | true>, [key, regex, errorMessage]) => ({
            ...acc,
            [key]: (value) => regex.test(value) || errorMessage,
        }),
        {},
    );

    return (
        <PageWrapper generateCss={() => `display: flex; justify-content: center;`}>
            <DevTool control={control} />
            <Paper
                generateCss={({ theme: { spacing } }) => `
                    padding: ${spacing(4)};
                    width: 350px;

                    ${StyledTextInput} {
                        margin: ${spacing(2)} 0;
                    }

                    ${StyledButton} {
                        margin-top: ${spacing(4)};
                        width: 100%;
                    }
                `}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        label="E-mail address"
                        type="email"
                        placeholder="Your email address"
                        name="e-mail"
                        ref={register({
                            required: true,
                            validate: (value) =>
                                PATTERNS.email.test(value) || 'Please provide a valid e-mail address...',
                        })}
                        hasError={!!errors['e-mail']}
                        message={
                            <ErrorMessage
                                errors={errors}
                                name="e-mail"
                                render={({ message }) => <div>{message}</div>}
                            />
                        }
                    />

                    <TextInput
                        label="Password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        ref={register({
                            required: true,
                            validate: passwordValidate,
                        })}
                        hasError={!!errors.password}
                        message={
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ message }) => <div>{message}</div>}
                            />
                        }
                    />

                    <Button type="submit">Continue</Button>
                </form>
            </Paper>
        </PageWrapper>
    );
};

type DynamicSelectFormData<O = { id: string; value: string; label: string }> = {
    focus?: O;
    industry?: O;
};

const industries = Array.from(new Array(10)).map((nothing, index) => ({
    id: `industry-${index + 1}`,
    value: `industry-${index + 1}`,
    label: `industry-${index + 1}`,
}));

const focuses = industries.reduce(
    (acc, { id: industry }) => ({
        ...acc,
        [industry]: Array.from(new Array(10)).map((nothing, index) => ({
            id: `focus-${index + 1}`,
            value: `focus-${index + 1}`,
            label: `focus-${index + 1}`,
        })),
    }),
    {} as Record<
        string,
        {
            id: string;
            value: string;
            label: string;
        }[]
    >,
);

export const DynamicSelect = () => {
    const { control, handleSubmit, watch } = useForm<DynamicSelectFormData>({
        mode: 'all',
        defaultValues: {
            focus: undefined,
            industry: undefined,
        },
    });
    const onSubmit = console.log;

    const watchIndustries = watch('industry');
    const focusOptions = focuses[watchIndustries?.id || ''] || [];

    return (
        <PageWrapper generateCss={() => `display: flex; justify-content: center;`}>
            <DevTool control={control} />
            <Paper
                generateCss={({ theme: { spacing } }) => `
                    padding: ${spacing(4)};
                    width: 350px;

                    ${StyledSelect} {
                        margin: ${spacing(2)} 0;
                    }

                    ${StyledButton} {
                        margin-top: ${spacing(4)};
                        width: 100%;
                    }
                `}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="industry"
                        render={({ name, onChange }) => (
                            <Select
                                label="Industry"
                                name={name}
                                onChange={({ value }) => {
                                    console.log('Value:\t', value);
                                    onChange(value[0]);
                                }}
                                options={industries}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="focus"
                        render={({ name, onChange }) => (
                            <Select
                                disabled={!focusOptions.length}
                                label="Industry Focus"
                                name={name}
                                options={focusOptions}
                                onChange={({ value }) => {
                                    console.log('Value:\t', value);
                                    onChange(value[0]);
                                }}
                            />
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Paper>
        </PageWrapper>
    );
};

export const WithCurrency = () => {
    const { control, handleSubmit, watch } = useForm<{
        price?: { currency: 'CHF' | 'EUR' | 'GBR' | 'USD'; value?: number };
    }>({
        mode: 'all',
        defaultValues: {
            price: undefined,
        },
    });
    const onSubmit = console.log;

    return (
        <PageWrapper generateCss={() => `display: flex; justify-content: center;`}>
            <DevTool control={control} />
            <Paper
                generateCss={({ theme: { spacing } }) => `
                    padding: ${spacing(4)};
                    width: 350px;

                    ${StyledSelect} {
                        margin: ${spacing(2)} 0;
                    }

                    ${StyledButton} {
                        margin-top: ${spacing(4)};
                        width: 100%;
                    }
                `}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="price"
                        render={({ name, onChange }) => (
                            <Currency label="Total price" name={name} onChange={({ value }) => onChange(value)} />
                        )}
                    />
                    <Button type="submit">Show me the price</Button>
                </form>
            </Paper>
        </PageWrapper>
    );
};
