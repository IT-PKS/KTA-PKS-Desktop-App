/** @jsx jsx */
import React, { useState, useEffect, Fragment } from 'react'
import Card from 'components/deskstop/Card/Card'
import { jsx } from '@emotion/core';
import { getListdMembers, postVerifiedMembers } from '../../../client/MemberClient'
import { useTheme } from 'emotion-theming';
import createStyles from './DataKta.styles';
import { Theme } from '../../../components/base/src/theme';
import Table from '../../../components/base/src/components/Table/Table'
import ListCheckBox from './ListCheckBox'
import { useForm } from 'react-hook-form';
import {
	RegisterFormData,
	SelectOption
} from '../../../components/base/src/staticPages/Register/Register.formHelper';
import ValidasiInternet from '../validasi/ValidasiInternet'
import ModalDeleteMember from '../../../components/contextual/ModalDeleteMember'
import ModalMemberDetail from '../../../components/contextual/ModalMemberDetail/ModalMemberDetail'
import ModalEditMember from '../../../components/contextual/ModalEditMember/ModalEditMember'
import initSQLite from '../../../services/sqlite/initSQLite'
import { remote } from 'electron';
const { app } = remote
import { Member } from '../../../entity/Member'
import fs from 'fs'

// Components
import {
	Column,
	FormGroup,
	Button,
	Row,
	Checkbox,
	Select,
	Icon,
	Input
} from 'components/base';

import { options } from '../../../utils/DataHelpers'
import { postMembersRegistration } from 'client/RegisterClient';
import { log } from 'electron-log';


type iProps = {
	defaultValues?: { [K in keyof RegisterFormData]?: RegisterFormData[K] };
	state?: 'default' | 'success' | 'failed';
	onSubmit(): any;
	/** @default false */
	loading?: boolean;
	setState(value: any): any;
};

type Inputs = {
	fullname: string,
	id_card: string,
	email: string,
};
const DataKta: React.FC<iProps> = (props) => {
	const { register, handleSubmit } = useForm<Inputs>();
	const theme = useTheme<Theme>();
	const styles = createStyles(theme);
	const [datas, setDatas] = useState([])
	const [idSelected, setIdSelected] = useState<string>("")

	const [columnsMain, setColumnsMain] = useState([
		{
			title: 'NIK',
			dataIndex: 'id_card',
			key: 'id_card',
			width: 200,
			sort: true,
			onSortChange: (direction: string) => _handleSortChange('id_card', direction),

		},
		{
			title: 'Nama Lengkap',
			dataIndex: 'fullname',
			key: 'fullname',
			width: 250,
			sort: true,
			onSortChange: (direction: string) => _handleSortChange('fullname', direction),
		},
		{
			title: 'Alamat',
			dataIndex: 'address',
			key: 'address',
			width: 300,
		}
	])

	const [tindakanMasal, setTindankanMasal] = useState([])
	const [showModalDelete, setShowModalDelete] = useState(false)
	const [showModalLihat, setShowModalLihat] = useState<any>(false)
	const [checkInternet, setCheckInternet] = React.useState<Boolean>(true)
	const [messageSubmit, setMessageSubmit] = useState<string>("default")
	const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
	const [isBulkLoading, setIsBulkLoading] = useState<boolean>(false)
	const [page, setPage] = useState<number>(1)
	const [perPage, setPerPage] = useState<number>(10)
	const [selectAll, setSelectAll] = useState<boolean>(false)
	const [idAll, setIdAll] = useState<any>([])
	const [selected, setSelected] = useState<any>([])
	const [sortCol, setSortCol] = useState<string>("")
	const [sortBy, setSortBy] = useState<any>("")
	const [isDeleting, setIsDeleting] = useState<boolean>(false)
	const [activeRecord, setActiveRecord] = useState<any>(false)
	const [inputName, setInputName] = useState<string>('')
	const [inputNik, setInputNik] = useState<string>('')
	const [inputEmail, setInputEmail] = useState<string>('')
	const [showActiveSearch, setShowActiveSearch] = useState<boolean>(false)
	const [showModalEdit, setShowModalEdit] = useState<boolean>(false)


	const [currentPage, setCurrentPage] = useState<number>(1)
	const [total, setTotal] = useState<number>(1)
	const [lastPage, setLastPage] = useState<number>(1)

	const [defaultValue, setDefaultValue] = useState<any>({
		showEntris: [{ label: '10', value: '10', }],
		tindakanMasal: null
	})

	const _handleSortChange = async (...args: any) => {
		const [sortByCol, direction] = args
		setSortCol(sortByCol)
		setSortBy(direction)
	}

	const sorterLogic = (payload: any) => {
		let newPayload = payload

		if (sortCol) newPayload = { ...payload, sort_col: sortCol }
		if (sortBy) newPayload = { ...payload, sort_by: sortBy }
		if (sortBy && sortCol) newPayload = { ...payload, sort_col: sortCol, sort_by: sortBy }

		return newPayload
	}
	const handleSelectOnChange = (e: any, type: string) => {
		switch (type) {
			case 'showEntris':
				setPerPage(e.value)
				setDefaultValue({ ...defaultValue, showEntris: e })
				break;
			case 'tindakanMasal':
				setTindankanMasal(e.value)
				setDefaultValue({ ...defaultValue, tindakanMasal: e })
				break
		}
	}

	const _handleBodyCheckboxChange = (e: any, record: any) => {
		const { checked } = e.target;
		const id = record.id

		if (checked) {
			setSelected([...selected, id])
		} else {
			const array = [...selected];
			const deleteIndex = array.indexOf(id);
			if (deleteIndex > -1) {
				array.splice(deleteIndex, 1);
			}
			setSelected(array)
		}
	}

	const syncDataKTA = async () => {
		const connection: any = await initSQLite()
		let localMember = await connection.manager.find(Member, { where: { isSentToBackend: 0 } })

		localMember.map(async (member: any) => {
			let ktp_file: any = await fetch(app.getPath('userData') + '/' + member.ktp).then(r => r.blob()).then(blobFile => new File([blobFile], member.ktp, { type: `${member.ktp.split('.')[1]}` }))
			let profile_file: any = await fetch(app.getPath('userData') + '/' + member.profile).then(r => r.blob()).then(blobFile => new File([blobFile], member.profile, { type: `${member.profile.split('.')[1]}` }))
			console.log(ktp_file);
			console.log(profile_file);

			let registrationPayload = new FormData();
			registrationPayload.append('fullname', member.fullname);
			registrationPayload.append('nickname', member.nickname);
			registrationPayload.append('birthdate', member.birthdate);
			registrationPayload.append('birthplace', member.birthplace);
			registrationPayload.append('id_card', member.id_card);
			registrationPayload.append('gender', member.gender);
			registrationPayload.append('identity_type', member.identity_type);
			registrationPayload.append('religion', member.religion);
			registrationPayload.append('marital_status', member.marital_status);
			registrationPayload.append('job', member.job);
			registrationPayload.append('last_education', member.last_education);
			registrationPayload.append('blood_type', member.blood_type);
			registrationPayload.append('country_id', member.country_id || 0);
			registrationPayload.append('province_id', member.province_id);
			registrationPayload.append('city_id', member.city_id);
			registrationPayload.append('district_id', member.district_id);
			registrationPayload.append('sub_district_id', member.sub_district_id);
			registrationPayload.append('address', member.address);
			registrationPayload.append('domicile', member.domicile);
			registrationPayload.append('lat', member.lat);
			registrationPayload.append('lon', member.lon);
			registrationPayload.append('email', member.email);
			registrationPayload.append('ktp', ktp_file);
			registrationPayload.append('profile', profile_file);
			const { data, error } = await postMembersRegistration(registrationPayload);
			if (data) {
				let memberToUpdate = await connection.manager.findOne(Member, member.id);
				memberToUpdate.isSentToBackend = 1;
				const res = await connection.manager.save(memberToUpdate);
				console.log('====================================');
				console.log(res);
				console.log('====================================');
			}
		})

	}

	const CheckBoxHeader = () => (
		<Checkbox
			instanceId="checkbox-table-head"
			checked={selectAll}
			onChange={() => setSelectAll(!selectAll)}
		/>
	)

	const columns = [
		{
			title: <CheckBoxHeader />,
			key: 'checkbox',
			width: 40,
			render: (value: any, record: any) => {
				return (
					<Checkbox
						instanceId={record.key}
						checked={selected.includes(record.id) || selectAll}
						onChange={(e: any) => _handleBodyCheckboxChange(e, record)}
					/>
				);
			},
		},
	];

	const getPayload = () => ({
		fullname: inputName || undefined,
		id_card: inputNik || undefined,
		email: inputEmail || undefined,
		page: page,
		limit: perPage,
		is_active: 1
	})

	const handlePageChange = async (pageNum: number) => {
		setPage(pageNum)
	};

	const handleSelectBulkChange = (selectedOption: any) => {
		const value = selectedOption && 'value' in selectedOption ? selectedOption.value : undefined;
		setDefaultValue({ ...defaultValue, tindakanMasal: selectedOption })
		setTindankanMasal(value)
	}

	const _getTableData = async () => {
		setIsTableLoading(true)
		const payload = getPayload()
		const newPayload = sorterLogic(payload)
		const { data, meta } = await getListdMembers(newPayload)
		setCurrentPage(meta?.current_page)
		setTotal(meta?.total)
		setLastPage(meta?.last_page)
		setDatas(data)
		setIsTableLoading(false)
		let arr = []
		for (let i = 0; i < data.length; i++) {
			arr.push(data[i].id)
		}
		setIdAll([...idAll, arr])
	}

	const _handlePostMembers = async (...args: any) => {
		setIsTableLoading(true)
		const [id, status, isBulk] = args
		const payload = {
			member_id: id,
			status: status
		}

		const { data } = await postVerifiedMembers(payload)
		if (isBulk) return data
		if (data.message === "Success Approved Member" || 'Success Removed Member') {
			setCheckInternet(false)
			setMessageSubmit("success")
			setIsTableLoading(false)
		} else {
			setMessageSubmit("failed")
			setCheckInternet(false)
		}
	}


	const _handleShowColumn = (e: any) => {
		const existingData = [...columnsMain]
		const { checked, name, value } = e.target
		const dataCheckBox = [{
			title: name,
			dataIndex: value,
			key: value,
			width: 200,
		}]
		if (checked) {
			setColumnsMain([...existingData, ...dataCheckBox])
		} else {
			const removeData = existingData.filter((obj) => {
				return obj.title !== name
			})
			setColumnsMain(removeData)
		}
	}

	const _handleSubmitBulkAction = async () => {
		setIsBulkLoading(true)
		let res;
		let idBulk = selectAll ? idAll[0] : selected
		for (const val of idBulk) {
			res = await _handlePostMembers(val, tindakanMasal, true)
			console.log("res", res)
			if (res.message !== "Success Approved Member" || res.message !== 'Success Removed Member') {
				setMessageSubmit("failed")
				setCheckInternet(false)
			}
		}

		if (res.message === "Success Approved Member" || res.message === 'Success Removed Member') {
			setMessageSubmit("success")
			setIsTableLoading(false)
			setIsBulkLoading(false)
			setCheckInternet(false)
		}
	}

	const handleBulkAction = () => {
		if (tindakanMasal === undefined) {
			alert('Tindakan massal belum dipilih')
		} else if (!selected.length && !idAll.length) {
			alert('Tidak ada data yang dicentang')
		} else {
			_handleSubmitBulkAction()
		}
	}

	const checkIncludes = (name: string) => {
		let res = false
		for (var i = 0; i < columnsMain.length; i++) {
			if (columnsMain[i].title == name) res = true;
		}
		return res
	}

	const toggleModalDelete = () => setShowModalDelete(!showModalDelete)
	const toggleModalEdit = () => setShowModalEdit(!showModalEdit)
	const toggleModalLihat = () => setShowModalLihat(!showModalLihat)

	const handleDelete = (id: string) => {
		_handlePostMembers(id, "DELETED")
		setIsDeleting(true)
	}

	const _handleSubmitSearch = (data: any) => {
		setInputName(data.fullname)
		setInputNik(data.id_card)
		setInputEmail(data.email)
		setShowActiveSearch(true)
	}

	useEffect(() => {
		_getTableData()
	}, [])

	useEffect(() => {
		_getTableData()
	}, [page, perPage, inputName, inputNik, inputEmail, sortCol, sortBy])


	const columnsTindakan = [{
		title: 'Tindakan',
		dataIndex: 'id',
		key: 'id',
		width: 150,
		render: (id: any) => {
			return (

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<a style={{ padding: '5px', width: '75px', backgroundColor: '#000', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
						onClick={() => {
							setIdSelected(id)
							toggleModalLihat()
						}}>
						<Icon name={'address-card'} />&nbsp;
                    Lihat
                </a><br />
					<a style={{ padding: '5px', width: '86px', backgroundColor: '#47B920', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
						onClick={() => {
							setIdSelected(id)
							toggleModalEdit()
						}}>
						<Icon name={'edit'} />&nbsp;
								Ubah
						</a><br />
					<a style={{ padding: '5px', width: '79px', backgroundColor: '#CE352D', color: '#fff', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}
						onClick={() => {
							setActiveRecord({
								fullname: datas.find((v) => v.id === id).fullname,
								id: id
							})
							toggleModalDelete()
						}}
					>
						<Icon name={'trash'} />&nbsp;
                  Hapus
              </a>
				</div>

			)
		}
	}]

	const Content = () => (
		<Fragment>
			<h3>Tampilkan kolom :</h3>

			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{
					ListCheckBox.map((v, i) => {
						return (
							<div style={{ marginLeft: '10px' }}>
								<input
									type="checkbox"
									name={v.name}
									value={v.value}
									onChange={(e) => _handleShowColumn(e)}
									checked={checkIncludes(v.name)}
								/>
								<label>&nbsp;{v.name}</label>
							</div>
						)
					})
				}
			</div>
			<br />
			<form onSubmit={handleSubmit(_handleSubmitSearch)} noValidate>
				<Row>
					<Column col={[12, 12, 3]}>
						{/* NIK */}
						<FormGroup>
							<Input
								name="id_card"
								innerRef={register}
								type="text"
								placeHolder="Cari Berdasarkan NIK"
							/>
						</FormGroup>
					</Column>
					<Column col={[12, 12, 3]}>
						{/* Nama Panggilan */}
						<FormGroup>
							<Input
								innerRef={register}
								name="fullname"
								type="text"
								placeHolder="Cari Berdasarkan Nama"
							/>
						</FormGroup>
					</Column>
					<Column col={[12, 12, 3]}>
						{/* Nama email */}
						<FormGroup>
							<Input
								innerRef={register}
								name="email"
								type="email"
								placeHolder="Cari Berdasarkan Email"
							/>
						</FormGroup>
					</Column>
					<Column col={[12, 12, 3]}>
						<Button icon={{ name: 'search' }} type="submit" style={{ width: '83px', height: '35px' }}>
							cari
              </Button>
					</Column>
					<Column col={[12, 12, 12]}>
						{showActiveSearch &&
							<div css={[styles.searchInfo, styles.mtxs]}>
								Pencarian aktif:&nbsp;
                {!inputNik && !inputName && !inputEmail && <strong>Tidak Ada</strong>}
								{inputNik && <strong>nik: {inputNik}</strong>}
								{inputName && <strong>nama: {inputName}</strong>}
								{inputEmail && <strong>email: {inputEmail}</strong>}
							</div>
						}
					</Column>
				</Row>
			</form>
			<br />
			<Row>
				<Column col={[12, 12, 4]}>
					{/* Tindakan Masal */}
					<FormGroup>
						<Select<SelectOption>
							instanceId="select-bulk"
							defaultValue={defaultValue.tindakanMasal}
							options={options.tindakanMasal}
							onChange={(e: any) => handleSelectBulkChange(e)}
							placeholder="Tindakan masal"
							clearable
						/>
					</FormGroup>
				</Column>
				<Column col={[12, 12, 4]}>
					<Button
						icon={{ name: 'play-circle' }}
						type="submit"
						style={{ width: '113px', height: '35px' }}
						onClick={handleBulkAction}
						loading={isBulkLoading}
					>
						Eksekusi
				</Button>
				</Column>
				<Column col={[12, 12, 4]} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<span style={{ marginBottom: '15px' }}>Tampilkan</span>&nbsp;&nbsp;
					<span>
						<FormGroup style={{ width: '90px' }}>
							<Select<SelectOption>
								options={options.showEntris}
								defaultValue={defaultValue.showEntris}
								onChange={(e: any) => handleSelectOnChange(e, 'showEntris')}
							/>
						</FormGroup>
					</span>&nbsp;&nbsp;
				<span style={{ marginBottom: '15px' }}>entri</span>
				</Column>
			</Row>
			<Table
				columns={[...columns, ...columnsMain, ...columnsTindakan]}
				data={datas}
				loading={isTableLoading}
				pagination={{
					onPageChange: handlePageChange,
					currentPage: currentPage,
					perPage: perPage,
					totalData: total,
					totalPage: lastPage,
				}}
			/>

			<ModalDeleteMember
				deleting={isDeleting}
				fullname={activeRecord ? activeRecord.fullname : undefined}
				onDelete={() => handleDelete(activeRecord.id)}
				open={showModalDelete}
				toggle={toggleModalDelete}
			/>
			{showModalLihat &&

				<ModalMemberDetail
					open={showModalLihat}
					toggle={toggleModalLihat}
					data={datas.length > 1 && datas.find((v) => v.id === idSelected)}

				/>
			}

			{
				showModalEdit &&
				<ModalEditMember
					open={showModalEdit}
					toggle={toggleModalEdit}
					data={datas.length > 1 && datas.find((v) => v.id === idSelected)}
				/>
			}

		</Fragment>
	)

	return (
		<Card>
			<Row>
				<Column>
					<h2 css={[styles.heading]}>Data KTA</h2>
				</Column>
				{
					checkInternet &&
					<Column>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<Button icon={{ name: "sync-alt", placement: "left" }} onClick={syncDataKTA}>Sinkronkan Data</Button>
						</div>
					</Column>
				}
			</Row>
			{
				checkInternet ?
					<Content /> :
					<ValidasiInternet state={messageSubmit} onNewValidate={() => setCheckInternet(true)} />
			}
		</Card>
	)
}

export default DataKta
