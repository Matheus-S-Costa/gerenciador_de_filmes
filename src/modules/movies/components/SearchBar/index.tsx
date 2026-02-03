import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../../../shared/components/Button/Button';
import { Select } from '../../../shared/components/Select';
import { Input } from '../../../shared/styles/Input';
import { InputField } from '../../../shared/styles/InputField';
import { SearchBarForm } from './styles';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
    onFormSubmit: (formData: MovieFormData) => void;
}

export interface MovieFormData {
    s: string; // search text
    type: {
        value: 'movie' | 'series' | 'episode';
        label: string;
    };
}

export const SearchBar: React.FC<SearchBarProps> = ({ onFormSubmit }) => {
    const { register, handleSubmit, control } = useForm<MovieFormData>();
    const { t } = useTranslation(['searchForm']);

    const selectOptions = [
        { value: 'movie', label: t('movie') },
        { value: 'series', label: t('series') },
        { value: 'episode', label: t('episode') },
    ];

    return (
        <SearchBarForm onSubmit={handleSubmit(onFormSubmit)}>
            <InputField>
                <Input
                    type="text"
                    name="s"
                    ref={register}
                    placeholder={t('title')}
                />
            </InputField>
            <InputField>
                <Controller
                    name="type"
                    placeholder={t('select')}
                    control={control}
                    options={selectOptions}
                    as={Select}
                />
            </InputField>
            <InputField>
                <Button type="submit" label={t('search')} />
            </InputField>
        </SearchBarForm>
    );
};
