function calculateProgress(index = 0, numberOfSteps: number) {
    const onFirstStep = index === 0;
    const onLastStep = index === numberOfSteps;

    if (onFirstStep) return 0;
    if (onLastStep) return 1;

    const percentageOfSingleStep = 1 / numberOfSteps;
    return percentageOfSingleStep * index;
}

export { calculateProgress };
