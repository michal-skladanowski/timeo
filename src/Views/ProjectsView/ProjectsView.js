import React from 'react';
import Header from '../../Components/Header/Header';
import styles from './projectsView.module.scss'
import MenuSidebar from '../../Components/MenuSidebar/MenuSidebar';

 class AddRecordView extends React.Component {
    
    render(){
        
        return(
            <div className={styles.wrapper}>
                <MenuSidebar/>
                <div>
                    <Header>
                        Hello
                    </Header>
                    Hello
                </div>
            
            </div>
        )
    }
 }

 export default AddRecordView;