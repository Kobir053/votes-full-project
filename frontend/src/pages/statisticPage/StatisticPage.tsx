import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllUsers } from '../../store/features/userSlice';
import { IUser } from '../../../../backend/src/models/userModel';
import './statisticPage.css';
import { ICandidate } from '../../store/features/candidatesSlice';

interface Bla {
    [key: string]: number;
}

const StatisticPage: React.FC = () => {

    const colors = ["red", "green", "blue", "gray"];

    const allUsers = useSelector((state: RootState) => state.user.allUsers);

    const candidates = useSelector((state: RootState) => state.candidates.candidates);

    const [statistics, setStatistics] = useState<Bla>({});

    const sortForTable = () => {
        let newArr = [];
        for(let i = 0;i < 2;i++){
            for(let j = 0;j < allUsers!.length;i++){
                if(i == 0 && allUsers![j].hasVoted)
                    newArr.push(allUsers![j]);
                else if(i == 1 && !allUsers![j].hasVoted){
                    newArr.push(allUsers![j]);
                }    
            }
        }
        return newArr;
    }

    const voteStatistic = () => {
        if(candidates.length == 0) return;
        let statisticData: Bla = {};
        candidates.forEach((c: ICandidate) => {
            statisticData = {...statisticData, [c.name]: c.votes/allUsers!.length * 100}
        });
        console.log(statisticData);
        setStatistics(statisticData);
        return statisticData;
    }

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const renderUsers = () => {
        if(!allUsers || allUsers!.length == 0 ) return;
        const newAllUsersList = sortForTable();
        return newAllUsersList.map((u: IUser, index: number) => {
            return <div key={index} className='user-in-table' style={{color: u.hasVoted? "greenyellow": "red"}}>
                        <p>{u.username}</p>
                        <p>{u.hasVoted? "voted ✅": "not voted ❌"}</p>
                    </div>
        });
    }

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    useEffect(() => {
        voteStatistic();
    }, [candidates]);

  return (
    <div className='statistic-page'>
        <div className='table-of-users'>
            {renderUsers()}
        </div>
        <div className='statistic-of-votes'>
            {Object.entries(statistics).map((val, ind) => {return <div style={{height: val[1] == 0? 15   +"%": val[1] +"%", backgroundColor: colors[ind], right: (ind+1)*20 +"%"}} className='stats'>
                <p>{val[0]}</p>
                <p>{val[1]}%</p>
            </div>})}
        </div>
    </div>
  )
}

export default StatisticPage