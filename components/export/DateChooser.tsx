import moment, { Moment } from "moment";
import { RefObject, useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type DateChooserProps = {
    setDateTime: (date: Moment) => void;
    handleCloseDateChooser: () => void;
}

const DateChooser = (props: DateChooserProps) => {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(true);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [date, setDate] = useState<Moment>(moment());

    const handleDateConfirm = (date: Date) => {
        setDate(moment(date));
        setShowTimePicker(true);
        setShowDatePicker(false);
    }

    const handleTimeConfirm = (time: Date) => {
        props.setDateTime(moment()
            .year(date.year())
            .month(date?.month())
            .dayOfYear(date.dayOfYear())
            .hour(time.getHours())
            .minute(time.getMinutes())
            .second(time.getSeconds())
        );
    }

    return (
        <>
            <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={() => props.handleCloseDateChooser()}
            />
            <DateTimePickerModal
                isVisible={showTimePicker}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={() => props.handleCloseDateChooser()}
            />
        </>
    );
}

export default DateChooser;