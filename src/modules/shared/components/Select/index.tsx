import CustomSelect from 'react-select';
import { SelectComponentsProps } from 'react-select/src/Select';
import styled from 'styled-components';

const SelectContainer = styled.div`
    .watchlater-select-container {
        min-width: 150px;
    }
`;

export const Select: React.FC<SelectComponentsProps> = props => (
    <SelectContainer>
        <CustomSelect
            className="watchlater-select-container"
            classNamePrefix="watchlater-select"
            {...props}
        />
    </SelectContainer>
);
