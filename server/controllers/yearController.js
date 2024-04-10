const getYearInfo = () => {
    try {
        const currentYear = new Date().getFullYear();
        const startYear = 2022;
        const years = [];

        for (let year = currentYear; year >= startYear; year--) {
            years.push({ value: year.toString(), label: year.toString() });
        }

        console.log('Years:', years); // Add this log to check the generated years array

        return {
            currentYear: currentYear.toString(),
            yearOptions: years,
        };
    } catch (error) {
        console.error('Error fetching year info:', error);
        throw error;
    }
};

const handleYearInfoRequest = async (req, res, next) => {
    try {
        const yearInfo = await getYearInfo();
        res.json(yearInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Make sure to call next() if this is middleware


module.exports = {
    getYearInfo,
    handleYearInfoRequest
};
