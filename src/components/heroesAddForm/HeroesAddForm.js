import { useState } from "react";
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);

    const [createHero] = useCreateHeroMutation();

    const [nameHero, setNameHero] = useState('');
    const [descrHero, setDescrHero] = useState('');
    const [elementHero, setElementHero] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: nameHero,
            description: descrHero,
            element: elementHero
        }

        createHero(newHero).unwrap();
        
        setNameHero('');
        setDescrHero('');
        setElementHero('');
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Загрузка элементов</option>
        } else if (status === 'error') {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {
                if (name === 'all') return;
                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded"
            onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={nameHero}
                    onChange={(e) => setNameHero(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={descrHero}
                    onChange={(e) => setDescrHero(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={elementHero}
                    onChange={(e) => setElementHero(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;