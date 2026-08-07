import React, { useEffect, useState } from 'react'
import '../style/sidebar.css'
import { useFollow } from '../hooks/useFollow'

const UserRow = ({ user, children }) => {
    return (
        <div className="sidebar-user-row">
            <div className="img-wrapper">
                <img src={user.profileImage || "https://ik.imagekit.io/wqspuebx7/defaultPP.jpg"} alt="" />
            </div>
            <p className="username">{user.username}</p>
            {children && <div className="row-actions">{children}</div>}
        </div>
    )
}

const SECTIONS = [
    { key: 'following', label: 'Following' },
    { key: 'followers', label: 'Followers' },
    { key: 'requests', label: 'Requests' },
    { key: 'people', label: 'People' },
]

const Sidebar = () => {
    const { following, followers, requests, loading, loadAll, users, requestedUsers, handleAccept, handleReject, handleFollow, handleUnfollow } = useFollow()
    const [activeSection, setActiveSection] = useState('following')

    useEffect(() => {
        loadAll()
    }, [])

    const followingUsernames = following.map(
        user => user.username
    );

    const peopleToFollow = users.filter(user => {
        return !followingUsernames.includes(
            user.username
        );

    });

    return (
        <aside className="sidebar">
            <div className="sidebar-tabs">
                {SECTIONS.map(section => (
                    <button
                        key={section.key}
                        className={`sidebar-tab ${activeSection === section.key ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.key)}>
                        {section.label}
                        {section.key === 'requests' && requests.length > 0 && (
                            <span className="badge">{requests.length}</span>
                        )}
                    </button>
                ))}
            </div>

            <div className="sidebar-content">
                {loading && <p className="sidebar-empty"></p>}

                {!loading && activeSection === 'following' && (
                    following.length === 0
                        ? <p className="sidebar-empty">You're not following anyone yet.</p>
                        : following.map(user => (<UserRow key={user._id || user.username} user={user}>
                            <button className="unfollow-btn" onClick={() => handleUnfollow(user.username)} > Unfollow </button>
                        </UserRow>
                        ))
                )}

                {!loading && activeSection === 'followers' && (
                    followers.length === 0
                        ? <p className="sidebar-empty">No followers yet.</p>
                        : followers.map(user => <UserRow key={user.username} user={user} />)
                )}

                {!loading && activeSection === 'requests' && (
                    requests.length === 0
                        ? <p className="sidebar-empty">No pending follow requests.</p>
                        : requests.map(request => (
                            <UserRow key={request.follower} user={{ username: request.follower }}>
                                <button className="accept-btn" onClick={() => handleAccept(request.follower)}>
                                    <i className="ri-check-line"></i>
                                </button>
                                <button className="reject-btn" onClick={() => handleReject(request.follower)}>
                                    <i className="ri-close-line"></i>
                                </button>
                            </UserRow>
                        ))
                )}

                {!loading && activeSection === 'people' && (
                    peopleToFollow.length === 0
                        ? (<p className="sidebar-empty"> No new people to follow. </p>)
                        : (peopleToFollow.map(user => {
                            const isRequested = requestedUsers.includes(user.username)
                            return (<UserRow key={user._id || user.username} user={user} >
                                <button className={isRequested ? "requested-btn" : "follow-btn"} disabled={isRequested}
                                    onClick={() => handleFollow(user.username)} > {isRequested ? "Requested" : "Follow"}
                                </button>

                            </UserRow>)
                        }))
                )}
            </div>
        </aside>
    )
}

export default Sidebar