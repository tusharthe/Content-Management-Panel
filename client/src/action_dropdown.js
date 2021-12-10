import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { CheckCircleIcon, CheckIcon, ChevronDownIcon, ClipboardListIcon, XCircleIcon, XIcon } from '@heroicons/react/solid'

export default function ActionDropdown(props) {
    return (
        <div className="w-30 text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex flex-row items-center justify-center text-sm   bg-bluestarbg font-bold text-bluestartext ">

                        <ClipboardListIcon className="w-4 h-4 mr-1" />

                        Action
                        <ChevronDownIcon
                            className="w-4 h-4 ml-2"

                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-30 mt-2 origin-top-right  bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">

                            <Menu.Item onClick={() => props.callAction('accept')}>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-bluestarnav text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        {!active ? (
                                            < CheckIcon
                                                className="w-5 h-5 mr-2"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <CheckCircleIcon
                                                className="w-5 h-5 mr-2"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Accept
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item onClick={() => props.callAction('reject')}>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-bluestarnav text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        {!active ? (
                                            <XIcon
                                                className="w-5 h-5 mr-2"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <XCircleIcon
                                                className="w-5 h-5 mr-2"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Reject
                                    </button>
                                )}
                            </Menu.Item>

                        </div>

                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
