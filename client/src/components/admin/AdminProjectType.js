import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProjectType, deleteProjectTypeById } from '../../actions/projectType';

const AdminProjectType = ({deleteProjectTypeById, getAllProjectType, projectTypes: {projectTypes}}) => {

    useEffect(() => {
        getAllProjectType();
    }, [getAllProjectType]);

    const deleteProjectType = (id) => {
        deleteProjectTypeById(id);
    }

    if(projectTypes != null){
        var listTypes = projectTypes.map((pro) =>
            <tr key={pro._id}>
                <td>{pro.name}</td>
                <td className="hide-sm">{pro.description}</td>
                <td className="hide-sm">
                    <Link to="/" className="btn btn-primary">
                        Editar
                    </Link>
                </td>
                <td className="hide-sm">
                    <a onClick={e => deleteProjectType(pro._id)} className="btn btn-danger" >
                        Eliminar
                    </a>
                </td>
            </tr>
        );
    }

    return (

        <Fragment>
            
            <Link to="/admin" className="btn btn-secondary">
                Atras
            </Link>

            <Link to="/admin-project-type/create-project-type" className="btn btn-primary my-1">
                Nuevo Tipo de proyecto
            </Link>

            <h2 className="my-2">Lista de tipos de proyectos</h2>

            <table className="table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th className="hide-sm">Descripción</th>
                    <th className="hide-sm"></th>
                    <th className="hide-sm"></th>
                </tr>
                </thead>
                <tbody>{listTypes}</tbody>
            </table>

        </Fragment>
    )
}

AdminProjectType.propTypes = {
    getAllProjectType: PropTypes.func.isRequired,
    deleteProjectTypeById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    projectTypes: state.projectType
})

export default connect(mapStateToProps, {getAllProjectType, deleteProjectTypeById})(AdminProjectType);
